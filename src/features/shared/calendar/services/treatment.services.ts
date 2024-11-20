import { privateApiClient } from "@constants/api.constants";
import { ITreatmentDataResponse } from "@features/admin/treatments/types/treatment.types";


export const getTreatments = async (type: string) => {

  try {
    const response = await privateApiClient.get(`/treatment/v1/get-treatments?type=${type}`);
    return response.data as ITreatmentDataResponse[];
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return undefined;
  }
};

export const getTreatmentCost = async (appointmentId: string) => {

  try {
    const response = await privateApiClient.get(`/treatment/v1/get-treatment-cost/${appointmentId}`) 
    return response.data ? response.data : undefined;
  } catch (error) {
    console.error('Error fetching treatment cost:', error);
    return undefined;
  }
}