import { useQuery } from "@tanstack/react-query"
import { privateApiClient } from "@constants/api.constants";
import { TreatmentCostsResponseType } from "@features/admin/treatments/types/treatment.types";

export const useTreatmentCosts = (appointmentId: string) => {
  return useQuery<TreatmentCostsResponseType>({
    queryKey: ['paymentTreatmentCost', appointmentId],
    queryFn: async () => {
      const response = await privateApiClient.get(`/treatment/v1/get-treatment-cost/${appointmentId}`) 
      return response.data ? response.data : undefined;
    },
  })
}

