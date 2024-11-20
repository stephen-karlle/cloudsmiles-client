import { useQuery } from "@tanstack/react-query"
import { IDentistData } from "../../types/appointment.types";
import { privateApiClient } from "@constants/api.constants";


export const useWeekDentist = () => {
  return useQuery({
    queryKey: ['calendarWeekDentistsData'],
    queryFn: async () => {
      const response = await privateApiClient.get(`/staff/v1/get-week-dentist`);
      return response.data as IDentistData[] | [] ;
    },
  })
}