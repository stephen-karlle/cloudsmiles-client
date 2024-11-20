import { useDayDentist } from '@features/shared/calendar/services/state/useDayDentist';
import { convertTimeStringToISODate, generateDayTimeSlots, getWorkingTimeUnavailability, removeDateOffset } from '@features/shared/calendar/utils/calendar.utils';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { Fragment, useEffect } from 'react'
import { privateApiClient } from '@constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import TimeLine from '../TimeLine';
import LunchBreakEvent from '../events/LunchBreakEvent';
import DayWorkingTimeEvents from '../events/day/DayWorkingTimeEvents';
import DayAppointmentEvents from '../events/day/DayAppointmentEvents';
import DayGrid from '../grid/DayGrid';
import { convertDateToISOString } from '@utils/date.utils';



const DayColumns = () => {

  const { data: dentists } = useDayDentist()
  const date = useCalendarStore((state) => state.date) 
  const appointments = useCalendarStore((state) => state.appointments)
  const setAppointments = useCalendarStore((state) => state.setAppointments)
  const openingTime = useCalendarStore((state) => state.openingTime)
  const closingTime = useCalendarStore((state) => state.closingTime)
  const lunchBreak = useCalendarStore((state) => state.lunchBreak)
  const setTimeSlots = useCalendarStore((state) => state.setTimeSlots)
  const timeSlots = useCalendarStore((state) => state.timeSlots)
  
  const { isLoading, isError } = useQuery({
    queryKey: ['calendarDailyAppointmentData', date],
    queryFn: async () => {
      try {
        const response = await privateApiClient.get(`/appointment/v1/get-appointments/day/${convertDateToISOString(date)}`);
        setAppointments(response.data);
        return response.data 
      } catch (error) {
        console.log(error)
      }
    },
  });

  // Get the current date and time
  const currentDate = new Date()
  const currentHour = new Date().getHours();
  const currentTime = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  
  // Get the state from the store


  const isSameDate = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() &&date.getFullYear() === currentDate.getFullYear();
  const hasTimeSlots = timeSlots.length > 0;
  const isWithinOperatingHours = currentHour >= openingTime && currentHour < closingTime;


  useEffect(() => {
    if (!dentists) return;
    const fetchTimeSlots = async () => {

      const startTime = new Date(date);
      startTime.setHours(lunchBreak.start.getHours(), lunchBreak.start.getMinutes(), lunchBreak.start.getSeconds());
      const endTime = new Date(date);
      endTime.setHours(lunchBreak.end.getHours(), lunchBreak.end.getMinutes(), lunchBreak.end.getSeconds());
      

      const appointmentSlots = appointments ? appointments 
        .map(oldAppointment => generateDayTimeSlots(
          removeDateOffset(oldAppointment.appointmentData.appointmentDate.start), 
          removeDateOffset(oldAppointment.appointmentData.appointmentDate.end), 
          oldAppointment.dentistData._id
        )) : [];
  
      const lunchBreakSlots = dentists.map(dentist => 
        generateDayTimeSlots(startTime, endTime, dentist._id)
      );
    
  
      const workingTimeUnavailableSlots = dentists.map((dentist) => {
        const startTime = convertTimeStringToISODate(dentist.startTime, date);
        const endTime = convertTimeStringToISODate(dentist.endTime, date);
        const unavailableSlots = getWorkingTimeUnavailability(startTime, endTime, openingTime, closingTime);
        return unavailableSlots?.map(unavailable => generateDayTimeSlots(unavailable.start, unavailable.end, dentist._id));
      }).flat();
  
      setTimeSlots([
        ...lunchBreakSlots.flat(),
        // ...unavailabilitySlots.flat(),
        ...appointmentSlots.flat(),
        ...workingTimeUnavailableSlots.flat()
      ]);
    };
  
    fetchTimeSlots();
  }, [date,appointments, dentists]);

    

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!dentists) return <div>No Dentists assigned </div>;

  return (
    <Fragment>
      {/* Calendar Grid */}
      <DayGrid dayGridCols={dentists.length} />


      <DayWorkingTimeEvents />
      <DayAppointmentEvents />
      {/* Lunch Break */}
      {dentists.length > 0 && <LunchBreakEvent type="day" />}
      
      {/* RED LINE WHICH SHOWS THE TIME*/}
      {dentists && isSameDate && hasTimeSlots && isWithinOperatingHours && (
          <TimeLine currentTime={currentTime} />
        )
      }
    </Fragment>
  )
}

export default DayColumns