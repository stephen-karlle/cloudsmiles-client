import { useQuery } from "@tanstack/react-query"
import { IDentistData } from "../../types/appointment.types";
import { privateApiClient } from "@constants/api.constants";


export const useMonthlyDentist = () => {
  return useQuery({
    queryKey: ['calendarMonthlyDentistsData'],
    queryFn: async () => {
      const response = await privateApiClient.get(`/staff/v1/get-monthly-dentist`);
      return response.data as IDentistData[] | [] ;
    },
  })
}