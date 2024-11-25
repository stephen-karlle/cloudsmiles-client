import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "../schemas/order.schema";
import { OrderType } from "../types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/order.services";
import { toast } from "sonner";
import { useStocksStore } from "../stores/stocks.store";
import { useDrawerStore } from "@stores/drawer.store";
import { createActivity } from "@features/admin/activities/services/activity.services";
import { useUserStore } from "@stores/user.store";
import Toast from "@components/ui/Toast";

const usePurchaseOrder = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);
  const setIsLoading = useStocksStore((state) => state.setIsLoading);

  const methods = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
    mode: "onSubmit",
    defaultValues: {
      orderVendorId: '',
      orderProducts: [],
      orderNotes: '',
      orderSendEmail: false
    }
  });


  const mutation = useMutation({
    mutationFn: async (data: OrderType) => {
      setIsLoading(true);
      const response = await createOrder(data);
      return response; 
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ordersTableData']}); 
      toast.custom(() => (
        <Toast title="Order" message="has been created" subtitle="" status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      setDrawerOpen(false);
      setIsLoading(false);
      methods.reset()
    }
  });


  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Purchase order for ${data.orderVendorId} has been added.`,
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

export default usePurchaseOrder;
