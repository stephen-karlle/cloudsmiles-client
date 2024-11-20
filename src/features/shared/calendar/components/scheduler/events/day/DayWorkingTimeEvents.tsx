import { useDayDentist } from '@features/shared/calendar/services/state/useDayDentist';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { 
  calculatePositionAndSizeOfUnvailableDayWorkingTime, 
  convertTimeStringToISODate, 
  getWorkingTimeUnavailability 
} from '@features/shared/calendar/utils/calendar.utils';
import { Fragment } from 'react'

const DayWorkingTimeEvents = () => {

  const date = useCalendarStore((state) => state.date);
  const openingTime = useCalendarStore((state) => state.openingTime); 
  const closingTime = useCalendarStore((state) => state.closingTime);
  const gridColWidth = useCalendarStore((state) => state.gridColWidth);
  const { data: dentists } = useDayDentist();

  
  return (
    <Fragment>
      {/* This is for the event where the dentists only works 1-5 then it will */}
      {dentists && dentists.map((dentist, index) => {
        const startTime = convertTimeStringToISODate(dentist.startTime, date);
        const endTime = convertTimeStringToISODate(dentist.endTime, date);
        const unavailableSlots = getWorkingTimeUnavailability(startTime, endTime, openingTime, closingTime);

        return unavailableSlots?.map((nonAvailableTime, subIndex) => {
          const start = nonAvailableTime.start;
          const end = nonAvailableTime.end;
          const { position, size } =  calculatePositionAndSizeOfUnvailableDayWorkingTime( start, end, openingTime,gridColWidth, index) 
          return (
            <div 
              key={subIndex}
              className="flex items-center justify-center stripes-unavailable"
              style={{
                width: `${gridColWidth}px`,
                height: `${size * 30}px`,
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute'
              }}
            >
              <p className="text-gray-500 text-xs tracking-wide px-2 uppercase bg-gray-100 font-medium rounded-sm">NOT AVAILABLE</p>
            </div>
          );
        })
      })}
    </Fragment>
  )
}

export default DayWorkingTimeEvents