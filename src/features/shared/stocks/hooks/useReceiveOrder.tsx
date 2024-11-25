import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderReceiveSchema } from "../schemas/order.schema";
import { OrderReceiveType } from "../types/order.types";
import { useStocksStore } from "../stores/stocks.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { receieveOrder } from "../services/order.services";
import { toast } from "sonner";
import { useDrawerStore } from "@stores/drawer.store";
import { createActivity } from "@features/admin/activities/services/activity.services";
import { useUserStore } from "@stores/user.store";
import Toast from "@components/ui/Toast";

const useReceiveOrder = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const setIsLoading = useStocksStore((state) => state.setIsLoading);
  const selectedOrder = useStocksStore((state) => state.selectedOrder);

  const methods = useForm<OrderReceiveType>({
    resolver: zodResolver(OrderReceiveSchema),
    mode: "onSubmit",
    defaultValues: {
      orderId: selectedOrder._id,
      orderProducts: selectedOrder.orderProducts.map((product) => ({
        productId: product.productId._id,
        productQuantity: product.productQuantity,
        productStatus: product.productStatus,
        productReceived: product.productReceived
      }))
    }
  });

  
  const mutation = useMutation({
    mutationFn: async (data: OrderReceiveType) => {
      setIsLoading(true);
      const response = await receieveOrder(data);
      return response; 
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ordersTableData']}); 
      toast.custom(() => (
        <Toast title="Order" message="has been received" subtitle={selectedOrder.orderSerialId} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      closeDrawer();
      setIsLoading(false);
      methods.reset()
    }
  });


  const onSubmit: SubmitHandler<OrderReceiveType> = async (data) => {
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Purchase order for ${selectedOrder.orderSerialId} has been received.`,
        activityAction: "Create",
      })
    }
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit
  };
};

export default useReceiveOrder;
