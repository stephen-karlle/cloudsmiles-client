import { calculatePositionAndSizeOfWeekAppointments } from '../../../../utils/calendar.utils';
import { Fragment } from 'react'
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import WeekAppointmentCard from '../../cards/WeekAppointmentCard';
import { useWeekDentist } from '@features/shared/calendar/services/state/useWeekDentist';

const WeekAppointmentEvents = () => {

  const { data: dentists } = useWeekDentist()


  const appointments = useCalendarStore((state) => state.appointments);
  const openingTime = useCalendarStore((state) => state.openingTime);

  if (!appointments) return <div>No appointments</div>;

  return (
    <Fragment>
      {(dentists && appointments) ? appointments && appointments.map((appointment, index) => {
          const { position, size } = calculatePositionAndSizeOfWeekAppointments(
            appointment.appointmentData.appointmentDate.start, 
            appointment.appointmentData.appointmentDate.end, 
            appointment.dentistData._id,
            dentists, 
            250, 
            openingTime
          );
          
          return (
            <Fragment key={index}>
              <WeekAppointmentCard
                index={index}
                positionX={position.x}
                positionY={position.y}
                size={size}
                appointment={appointment}
              />
            </Fragment>
          );
        }) : null
      }
    </Fragment>
  )
}

export default WeekAppointmentEvents