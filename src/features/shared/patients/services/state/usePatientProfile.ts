import { useQuery } from "@tanstack/react-query";
import { privateApiClient } from "@constants/api.constants";
import { PatientProfileResponseType } from "../../types/patient.types";
import { usePatientStore } from "../../stores/patient.store";

export const usePatientProfile = (id: string) => {
  const setSelectedProfile = usePatientStore((state) => state.setSelectedProfile);
  return useQuery<PatientProfileResponseType>({
    queryKey: ["adminPatientProfile"],
    queryFn: async () => {
      const response = await privateApiClient.get(`/patient/v1/get-patient-profile/${id}`);
      if (!response?.data) return null;
      setSelectedProfile(response.data);
      return response.data;
    },
  });
};
