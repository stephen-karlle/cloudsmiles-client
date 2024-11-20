import { z } from 'zod';

export const NewProductSchema = z.object({

  productAvatar: z.nullable(z.instanceof(File)).optional(),

  productSku: z.string({
    invalid_type_error: "SKU must be a string",
  }).min(1, {message: "SKU is required"}),

  productName: z.string({
    invalid_type_error: "Product name must be a string",
  }).min(1, {message: "Product name is required"}),

  productUnitPrice: z.preprocess((val) => parseFloat(val as string), z.number(
    { invalid_type_error: "Unit cost is required"}
  ).min(0, { message: "Unit cost is required" })),
  
  productQuantity: z.preprocess((val) => parseInt(val as string, 10), z.number(
    { invalid_type_error: "Quantity is required"}
  ).min(0, { message: "Quantity is required" })),
  
  productCategory: z.string({
    invalid_type_error: "Category must be a string"
  }).min(1, {message: "Category is required"}),
  
  productDescription: z.string({
    invalid_type_error: "Description must be a string"
  }).min(1, {message: "Description is required"}),

  vendorId: z.string({
    invalid_type_error: "Vendor is required",
    required_error: "Vendor is required"
  }).min(1, {message: "Vendor is required"}),
});


export const EditProductSchema = z.object({

  _id: z.string({
    invalid_type_error: " Product ID must be a string",
    required_error: " Product ID is required"
  }).min(1, { message: " Product ID is required" }),

  productAvatar: z.any().optional(),
  productSku: z.string({
    invalid_type_error: "SKU must be a string",
  }).min(1, {message: "SKU is required"}),

  productName: z.string({
    invalid_type_error: "Product name must be a string",
  }).min(1, {message: "Product name is required"}),

  productUnitPrice: z.preprocess((val) => parseFloat(val as string), z.number(
    { invalid_type_error: "Unit cost is required"}
  ).min(0, { message: "Unit cost is required" })),
  
  productCategory: z.string({
    invalid_type_error: "Category must be a string"
  }).min(1, {message: "Category is required"}),
  
  productDescription: z.string({
    invalid_type_error: "Description must be a string"
  }).min(1, {message: "Description is required"}),

  vendorId: z.string({
    invalid_type_error: "Vendor is required",
    required_error: "Vendor is required"
  }).min(1, {message: "Vendor is required"}),
});