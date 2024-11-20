
import { calculatePositionAndSizeOfDayAppointments, removeDateOffset } from '../../../../utils/calendar.utils';
import { Fragment } from 'react'
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { useDayDentist } from '@features/shared/calendar/services/state/useDayDentist';
import DayAppointmentCard from '../../cards/DayAppointmentCard';

const DayAppointmentEvents = () => {

  const { data: dentists } = useDayDentist()
  const appointments = useCalendarStore((state) => state.appointments);
  const openingTime = useCalendarStore((state) => state.openingTime);
  const date = useCalendarStore((state) => state.date);
  const gridColWidth = useCalendarStore((state) => state.gridColWidth);
  

  return (
    <Fragment>
 
      {(dentists && appointments) ? appointments
        .filter(appointment => {
          const appointmentDate = removeDateOffset(appointment.appointmentData.appointmentDate.start);
          return (
            appointmentDate.getDate() === date.getDate() &&
            appointmentDate.getMonth() === date.getMonth() &&
            appointmentDate.getFullYear() === date.getFullYear()
          );
        })
        .map((appointment, index) => {
          const { position, size } = calculatePositionAndSizeOfDayAppointments(
            appointment.appointmentData.appointmentDate.start, 
            appointment.appointmentData.appointmentDate.end, 
            appointment.dentistData._id,
            dentists, 
            gridColWidth, 
            openingTime
          );
          return (
            <Fragment key={index}>
              <DayAppointmentCard
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

export default DayAppointmentEvents