import { useQuery } from "@tanstack/react-query";
import { privateApiClient } from "@constants/api.constants";
import { usePaymentStore } from "../../stores/payment.store";
import { paymentMethodMap } from "../../constants/payment.constants";

export const usePaymentQrCode = (id: string, method: string) => {
  const paymentMethod = paymentMethodMap[method]
  const paymentStep = usePaymentStore((state) => state.paymentSteps[method]);
  const setPaymentStep = usePaymentStore((state) => state.setPaymentStep);


  return useQuery<string | null>({
    queryKey: ["paymentQrCode", paymentStep, method],
    queryFn: async () => {
      const response = await privateApiClient.get(`/payment/v1/get-qr-code/${id}?method=${paymentMethod}`);
      if (!response?.data) return null;
      setPaymentStep(method, 2);
      return `data:image/png;base64,${response.data}`;
    },
  });
};
