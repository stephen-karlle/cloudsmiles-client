import { useWeekDentist } from '@features/shared/calendar/services/state/useWeekDentist';
import { Fragment, useEffect } from 'react'
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { convertDateToISOString } from '@utils/date.utils';
import { convertTimeStringToISODate, getWorkingTimeUnavailability, removeDateOffset } from '@features/shared/calendar/utils/calendar.utils';
import { useQuery } from '@tanstack/react-query';
import { privateApiClient } from '@constants/api.constants';
import { generateWeekTimeSlots } from '@features/shared/calendar/utils/generator.utils';
import WeekWorkingTimeEvents from '../events/week/WeekWorkingTimeEvents';
import WeekGrid from '../grid/WeekGrid';
import LunchBreakEvent from '../events/LunchBreakEvent';
import WeekAppointmentEvents from '../events/week/WeekAppointmentEvents';
import TimeLine from '../TimeLine';



const WeekColumns = () => {
  const date = useCalendarStore((state) => state.date);

  const { data: dentists } = useWeekDentist()

  
  const setTimeSlots = useCalendarStore((state) => state.setTimeSlots)
  const lunchBreak = useCalendarStore((state) => state.lunchBreak)
  const appointments = useCalendarStore((state) => state.appointments)
  const setAppointments = useCalendarStore((state) => state.setAppointments);
  const openingTime = useCalendarStore((state) => state.openingTime)
  const closingTime = useCalendarStore((state) => state.closingTime)
  const timeSlots = useCalendarStore((state) => state.timeSlots)

  const { isLoading } = useQuery({
    queryKey: ['calendarWeeklyAppointmentData',  date],
    queryFn: async () => {
      try {
        const response = await privateApiClient.get(`/appointment/v1/get-appointments/week?date=${convertDateToISOString(date)}`);
        setAppointments(response.data);
        return response.data;
      } catch (error) {
        console.log(error)
      }
    },
  });

  const currentDate = new Date()
  const currentHour = new Date().getHours();
  const currentTime = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  
  const isSameDate = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() &&date.getFullYear() === currentDate.getFullYear();
  const hasTimeSlots = timeSlots.length > 0;
  const isWithinOperatingHours = currentHour >= openingTime && currentHour < closingTime;


  
  useEffect(() => {
    if (!dentists) return;
    const fetchTimeSlots = async () => {

      const dayNameToNumber: { [key: string]: number } = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
      };

      const appointmentTimeSlots = appointments.map(appointment => {
        const dentistId = appointment.dentistData._id
        const startTime = removeDateOffset(appointment.appointmentData.appointmentDate.start)
        const endTime = removeDateOffset(appointment.appointmentData.appointmentDate.end)
        return generateWeekTimeSlots(startTime, endTime, dentistId)
      }).flat()

      const lunchBreakSlots = dentists.flatMap(dentist => {
        return dentist.dentistSchedule ? dentist.dentistSchedule.flatMap(schedule => {

          const dayNumber = dayNameToNumber[schedule.day];

          const startTime = new Date(date);
          startTime.setHours(lunchBreak.start.getHours(), lunchBreak.start.getMinutes(), lunchBreak.start.getSeconds());
          
          const currentDayNumber = startTime.getDay();
          const dayDifference = dayNumber - currentDayNumber;
          
          startTime.setDate(startTime.getDate() + dayDifference);
          
          const endTime = new Date(date);
          endTime.setHours(lunchBreak.end.getHours(), lunchBreak.end.getMinutes(), lunchBreak.end.getSeconds());
          endTime.setDate(endTime.getDate() + dayDifference);

          return generateWeekTimeSlots(startTime, endTime, dentist._id);
        }) : [];
      }).flat()

      const workingTimeUnavailableSlots = dentists.flatMap((dentist) => {
        return dentist.dentistSchedule ? dentist.dentistSchedule.flatMap(schedule => {
          
          const startTime = convertTimeStringToISODate(schedule.start, date)
          const endTime = convertTimeStringToISODate(schedule.end, date)
          const dayNumber = dayNameToNumber[schedule.day];
          const currentDayNumber = startTime.getDay();
          const dayDifference = dayNumber - currentDayNumber;
          startTime.setDate(startTime.getDate() + dayDifference);
          endTime.setDate(endTime.getDate() + dayDifference);
          const unavailableSlots = getWorkingTimeUnavailability(startTime, endTime, openingTime, closingTime);
          return unavailableSlots?.map(unavailable => generateWeekTimeSlots(unavailable.start, unavailable.end, dentist._id));
        }) : [];
      }).flat()


      setTimeSlots([
        ...lunchBreakSlots.flat(),
        ...workingTimeUnavailableSlots.flat(),
        ...appointmentTimeSlots.flat(),
      ]);
    }
    fetchTimeSlots();
  }, [appointments]);

  


  if (isLoading) return <div>Loading...</div>;
  if (!dentists) return <div>No Dentists assigned </div>;

  return (
    <Fragment>
      <WeekGrid 
        dentists={dentists} 
      />
      <WeekAppointmentEvents />
      <WeekWorkingTimeEvents />

      {dentists.length > 0 && <LunchBreakEvent type="week" />}
      {dentists && isSameDate && hasTimeSlots && isWithinOperatingHours && (
          <TimeLine currentTime={currentTime} />
        )
      }
    </Fragment>
  )
}

export default WeekColumns