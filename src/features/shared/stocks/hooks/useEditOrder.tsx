import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditOrderSchema } from "../schemas/order.schema";
import { OrderType } from "../types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../services/order.services";
import { toast } from "sonner";
import { useStocksStore } from "../stores/stocks.store";
import { useDrawerStore } from "@stores/drawer.store";
import Toast from "@components/ui/Toast";

const useEditOrder = () => {

  const queryClient = useQueryClient();
  const selectedOrder = useStocksStore((state) => state.selectedOrder);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const setIsLoading = useStocksStore((state) => state.setIsLoading);

  const fileteredOrderProducts = selectedOrder.orderProducts.map((product) => {
    return {
      productId: product.productId._id,
      productQuantity: product.productQuantity,
      productStatus: product.productStatus,
      productName: product.productId.productName,
      productSku: product.productId.productSku,
      productUnitPrice: product.productId.productUnitPrice,
      productReceived: product.productReceived,
    }
  })


  const methods = useForm<OrderType>({
    resolver: zodResolver(EditOrderSchema),
    mode: "onSubmit",
    defaultValues: {
      orderId: selectedOrder._id,
      orderVendorId: selectedOrder.orderVendorId._id,
      orderProducts: fileteredOrderProducts,
      orderNotes: selectedOrder.orderNotes,
      orderSendEmail: false,
    }
  });


  const mutation = useMutation({
    mutationFn: async (data: OrderType) => {
      setIsLoading(true);
      const response = await updateOrder(data);
      return response; 
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ordersTableData']}); 
      toast.custom(() => (
        <Toast title="Order" message="has been updated" subtitle={selectedOrder.orderSerialId} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      closeDrawer();
      setIsLoading(false);
      methods.reset()
    }
  });


  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit
  };
};

export default useEditOrder;