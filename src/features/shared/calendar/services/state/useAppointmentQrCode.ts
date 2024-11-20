import { useQuery } from "@tanstack/react-query";
import { privateApiClient } from "@constants/api.constants";
import { usePaymentAppointmentStore } from "../../stores/appointment.stores";
import { paymentMethodMap } from "@features/shared/payments/constants/payment.constants";

export const useAppointmentQrCode = (id: string, method: string) => {

  const paymentMethod = paymentMethodMap[method]
  const paymentStep = usePaymentAppointmentStore(state => state.paymentSteps[method])
  const setPaymentStep = usePaymentAppointmentStore((state) => state.setPaymentStep);

  return useQuery<string | null>({
    queryKey: ["appointmentPaymentQrCode", paymentStep],
    queryFn: async () => {
      const response = await privateApiClient.get(`/payment/v1/get-qr-code/${id}?method=${paymentMethod}`);
      if (!response?.data) return null;
      setPaymentStep(method, 2);
      return `data:image/png;base64,${response.data}`;
    },
  });
};
