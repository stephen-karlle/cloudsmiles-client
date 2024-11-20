import { useWeekDentist } from '@features/shared/calendar/services/state/useWeekDentist';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { 
  calculatePositionAndSizeOfUnvailableWeekWorkingTime, 
  convertTimeStringDateToISODate, 
  getWorkingTimeUnavailability 
} from '@features/shared/calendar/utils/calendar.utils';
import { Fragment } from 'react';

const WeekWorkingTimeEvents = () => {
  const date = useCalendarStore((state) => state.date);
  const openingTime = useCalendarStore((state) => state.openingTime); 
  const closingTime = useCalendarStore((state) => state.closingTime);
  const gridColWidth = 250;
  const { data: dentists } = useWeekDentist();

  return (
    <Fragment>
      {dentists && dentists.map((dentist) => {
        if (!dentist.dentistSchedule) return null;

        const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const sortedDentistSchedule = dentist.dentistSchedule.sort((a, b) => {
          return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
        });

        return sortedDentistSchedule.map((daySchedule, index) => {
          const start = convertTimeStringDateToISODate(daySchedule.start, daySchedule.day, date);
          const end = convertTimeStringDateToISODate(daySchedule.end, daySchedule.day, date);

          const unavailability = getWorkingTimeUnavailability(start, end, openingTime, closingTime);
          

          return unavailability.map((unavailable, subIndex) => {
            const startTime = unavailable.start;
            const endTime = unavailable.end;
            const { position, size } = calculatePositionAndSizeOfUnvailableWeekWorkingTime(startTime, endTime, dentist._id, openingTime, dentists, gridColWidth);
            return (
              <div 
                key={`${dentist._id}-${index}-${subIndex}`} // Ensure a unique key
                className=" flex items-center justify-center stripes-unavailable w-[250px] absolute"
                style={{
                  height: `${size}px`, 
                  left: `${position.x}px`, 
                  top: `${position.y}px`,
                }}
              >
                <p className="text-gray-500 text-xs tracking-wide px-2 uppercase bg-gray-100 font-medium rounded-sm">
                  NOT AVAILABLE
                </p>
              </div>
            );
          });
        });
      })}
    </Fragment>
  );
}

export default WeekWorkingTimeEvents;
