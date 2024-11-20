import { useQuery } from "@tanstack/react-query"
import { IDentistData } from "../../types/appointment.types";
import { useCalendarStore } from "../../stores/calendar.stores";
import { privateApiClient } from "@constants/api.constants";
import { convertDateToISOString } from "@utils/date.utils";


export const useDayDentist = () => {
  const date = useCalendarStore((state) => state.date)
  return useQuery({
    queryKey: ['calendarDayDentistsData', date ],
    queryFn: async () => {
      const response = await privateApiClient.get(`/staff/v1/get-day-dentist/${convertDateToISOString(date)}`);
      return response.data as IDentistData[] | undefined ;
    },
  })
}