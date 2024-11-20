import { z } from 'zod';

export const OrderSchema = z.object({
  orderVendorId: z.string({
    invalid_type_error: "Supplier is required",
    required_error: "Supplier is required"
  }).min(1, {message: "Supplier is required"}),
  orderProducts: z.array(z.object({
    productId: z.string({
      invalid_type_error: "Product is required",
      required_error: "Product is required"
    }).min(1, {message: "Product is required"}),
    productQuantity: z.preprocess((val) => parseInt(val as string, 10), z.number(
      { invalid_type_error: "Quantity is required", required_error: "Quantity is required"}
    ).min(1, { message: "Quantity is required" })).default(1),
  })).min(1, {message: "Products are required"}),
  orderNotes: z.string({
    invalid_type_error: "Notes must be a string",
  }).optional(),
  orderSendEmail: z.boolean({
    invalid_type_error: "Send Email must be a boolean",
    required_error: "Send Email is required"
  }).default(false) 
})


export const OrderReceiveSchema = z.object({
  orderId: z.string().min(1, { message: "Order is required" }),
  orderStatus: z.string().optional(),
  orderProducts: z.array(
    z.object({
      productId: z.string().min(1, { message: "Product is required" }),
      productReceived: z.preprocess(
        (val) => parseInt(val as string, 10),
        z.number({
          invalid_type_error: "Quantity is required",
          required_error: "Quantity is required"
        }).min(0, { message: "Quantity is required" })
      ).default(1),
      productStatus: z.string().optional(),
      productQuantity: z.number({}).min(1, { message: "Quantity is required" }),
    })
  ).min(1, { message: "Products are required" }),
}).transform((data) => {
  data.orderProducts = data.orderProducts.map(product => ({
    ...product,
    productStatus: product.productReceived >= product.productQuantity ? "success" : "pending"
  }));
  return data;
})
.transform((data) => {
  // Determine orderStatus based on individual product statuses
  const hasPending = data.orderProducts.some(
    (product) => product.productStatus === "pending"
  );
  const allSuccess = data.orderProducts.every(
    (product) => product.productStatus === "success"
  );
  const allZero = data.orderProducts.every(
    (product) => product.productReceived === 0
  );

  if (allSuccess) {
    data.orderStatus = "completed";
  } else if (hasPending) {
    data.orderStatus = "partial";
  } 
  if (allZero) {
    data.orderStatus = "pending";
  }

  return data;
});

export const EditOrderSchema = z.object({
  orderId: z.string().min(1, { message: "Order is required" }),
  orderVendorId: z.string({
    invalid_type_error: "Supplier is required",
    required_error: "Supplier is required"
  }).min(1, {message: "Supplier is required"}),
  orderProducts: z.array(z.object({
    productId: z.string({
      invalid_type_error: "Product is required",
      required_error: "Product is required"
    }).min(1, {message: "Product is required"}),
    productQuantity: z.preprocess((val) => parseInt(val as string, 10), z.number(
      { invalid_type_error: "Quantity is required", required_error: "Quantity is required"}
    ).min(1, { message: "Quantity is required" })).default(1),
    productStatus: z.string().optional(),
    productReceived: z.number({
      invalid_type_error: "Received is required",
      required_error: "Received is required"
    }).min(0, {message: "Received is required"}),
  })).min(1, {message: "Products are required"}),
  orderNotes: z.string({
    invalid_type_error: "Notes must be a string",
  }).optional(),
  orderSendEmail: z.boolean({
    invalid_type_error: "Send Email must be a boolean",
    required_error: "Send Email is required"
  }).default(false),
  orderStatus: z.string().optional(),
}).transform((data) => {
  const orderProducts = data.orderProducts.map((product) => {
    const partial = product.productReceived < product.productQuantity;
    const success = product.productReceived === product.productQuantity;
    const pending = product.productReceived === 0;
    return {
      ...product,
      productStatus: pending ? "pending" : partial ? "partial" : success ? "success" : "pending"
    };
  });

  // Determine orderStatus based on productStatuses
  const hasPending = orderProducts.some((product) => product.productStatus === "pending");
  const hasPartial = orderProducts.some((product) => product.productStatus === "success");
  const isCompleted = orderProducts.every((product) => product.productStatus === "success");
  data.orderStatus = isCompleted ? "completed" : hasPartial ? "partial" : hasPending ? "pending" : "pending";
  
  // Update data.orderProducts with modified orderProducts
  data.orderProducts = orderProducts;

  return data;
});
