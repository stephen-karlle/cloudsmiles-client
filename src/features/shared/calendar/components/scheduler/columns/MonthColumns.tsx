import { Fragment } from "react/jsx-runtime";
import { useMonthlyDentist } from "@features/shared/calendar/services/state/useMonthlyDentist";
import { useQuery } from "@tanstack/react-query";
import { useCalendarStore } from "@features/shared/calendar/stores/calendar.stores";
import { convertDateToISOString } from "@utils/date.utils";
import { privateApiClient } from "@constants/api.constants";
import MonthlyGrid from "../grid/MonthGrid";

const MonthColumns = () => {
  const date = useCalendarStore((state) => state.date);
  const setAppointments = useCalendarStore((state) => state.setAppointments);
  const { data: dentists, isLoading: isLoadingDentists, isError: isErrorDentists } = useMonthlyDentist();
  const { isLoading: isLoadingAppointments, isError: isErrorAppointments } = useQuery({
    queryKey: ['calendarMonthlyAppointmentData', date],
    queryFn: async () => {
      try {
        const response = await privateApiClient.get(`/appointment/v1/get-appointments/month/${convertDateToISOString(date)}`);
        setAppointments(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error('Failed to fetch appointments'); // Rethrow error to trigger isError state
      }
    },
  });

  

  // Show loading state for dentists or appointments
  if (isLoadingDentists || isLoadingAppointments) return <p>Loading...</p>;

  // Show error state for dentists or appointments
  if (isErrorDentists || isErrorAppointments) return <p>Error loading data</p>;

  return (
    <Fragment>
      <MonthlyGrid dentists={dentists} />
    </Fragment>
  );
};

export default MonthColumns;
