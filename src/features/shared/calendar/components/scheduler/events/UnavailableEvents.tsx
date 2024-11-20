import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { calculatePositionAndSizeOfDayAppointments, removeDateOffset } from '../../../utils/calendar.utils';
import { Fragment } from 'react';
import { useDayDentist } from '@features/shared/calendar/services/state/useDayDentist';
import UnavailableCard from '../cards/UnavailableCard';


const UnavailableEvents = () => {

  const { data: dentists } = useDayDentist();
  const openingTime = useCalendarStore((state) => state.openingTime); 
  const date = useCalendarStore((state) => state.date);
  const gridColWidth = useCalendarStore((state) => state.gridColWidth);

  return (
    <Fragment>
      {/* This is for some reason the dentists cannot go  */}
      {dentists && dentists
        .filter(dentist => {
          return dentist?.unAvailableDates?.some(unavailable => {
            const appointmentDate = removeDateOffset(unavailable.start);
            return (
              appointmentDate.getDate() === date.getDate() &&
              appointmentDate.getMonth() === date.getMonth() &&
              appointmentDate.getFullYear() === date.getFullYear()
            );
          });
        })
        .map((dentist) => {
          return dentist.unAvailableDates?.map((nonAvailableTime, subIndex) => {
            const { position, size } = calculatePositionAndSizeOfDayAppointments(nonAvailableTime.start, nonAvailableTime.end, dentist._id, dentists, gridColWidth, openingTime);
            return (
              <UnavailableCard 
                gridColWidth={gridColWidth}
                size={size}
                position={position}
                key={subIndex}
              />
            );
          }
        );
      })}
    </Fragment>
  )
}

export default UnavailableEvents
