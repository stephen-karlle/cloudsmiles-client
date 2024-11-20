import { useCalendarStore } from "@features/shared/calendar/stores/calendar.stores";
import { formatTime } from "../../../utils/calendar.utils";



const TimeColumns = () =>{

  const openingTime = useCalendarStore((state) => state.openingTime);
  const closingTime = useCalendarStore((state) => state.closingTime);

  return(
    <section className="w-24 grid grid-cols-1 h-full sticky left-0 z-30" >
      {Array(closingTime - openingTime).fill(0).map((_, index) => {
        return (
          <div className="relative w-full bg-white h-[120px] border-r border-b border-gray-200" key={index}>
            <p key={index} className="text-center font-normal text-sm mt-4 text-gray-700 w-full">{formatTime(openingTime + index)}</p>
          </div>
        );
      })}
    </section>
  )
}

export default TimeColumns