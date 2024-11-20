import { useCalendarStore } from "@features/shared/calendar/stores/calendar.stores";
import { calculateLunchBreakPosition, generateDayGridCol } from "../../../utils/calendar.utils";
import { useDayDentist } from "@features/shared/calendar/services/state/useDayDentist";

const LunchBreakEvent = ({type } : {type : string}) => {

  const lunchBreak = useCalendarStore((state) => state.lunchBreak);
  const openingTime = useCalendarStore((state) => state.openingTime);
  const gridColWidth = useCalendarStore((state) => state.gridColWidth);

  const { data: dentists } = useDayDentist();
  const { lunchPosition, lunchSize } = calculateLunchBreakPosition(lunchBreak.start, lunchBreak.end, openingTime);

  const gridColsStyle = type === "day" ? generateDayGridCol(dentists, gridColWidth) : generateDayGridCol(dentists, 250 );

  

  return (
    <div 
      className="pl-[96px] bg-white flex items-center justify-center stripes-lunch-break"
      style={{
        height: `${lunchSize * 30}px`,
        width: `${gridColsStyle}px`,
        top: `${lunchPosition}px`,
        position: 'absolute'
      }}
    >
      <p className="text-gray-500 text-sm px-2 tracking-wide uppercase bg-gray-100 font-medium rounded-md">LUNCH BREAK</p>
    </div>
  )
}

export default LunchBreakEvent
