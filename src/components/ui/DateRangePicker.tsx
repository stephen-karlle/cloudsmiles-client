import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import CalendarIcon from '@icons/linear/CalendarIcon';
import ChevronIcon from '@icons/linear/ChevronIcon';
import useClickOutside from '@hooks/useClickOutside';

interface IDateRangePicker {
  className: string;
  startDate: Date | null;
  endDate: Date | null;
  setValue: (value: { startDate: Date | null; endDate: Date | null }) => void;
  placeholder: string;
  isDisabled?: boolean;
  didError?: boolean;
}

interface IDayGrid {
  dates: Date[];
  handleSelectDate: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  currentDate: Date;
}

const WeekHeader = () => {
  return (
    <div className="w-[14rem] h-fit grid grid-cols-7 ">
      {["Su","Mo","Tu","We","Th","Fr", "Sa"].map((day, index)=>(
        <div className="w-8  h-8  text-center text-sm" key={index}> 
          <p className="text-gray-500 text-sm">{day}</p>
        </div>
      ))}
    </div>
  )
}

const DayGrid = ({ 
  dates, 
  handleSelectDate, 
  startDate, 
  endDate, 
  currentDate 
}: IDayGrid) => {

  return (
    <div className="w-[14rem] h-fit grid grid-cols-7 gap-y-2">
      {dates.map((date, index) => {
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
        const isSelectedStart = startDate && new Date(startDate).toDateString() === date.toDateString();
        const isSelectedEnd = endDate && new Date(endDate).toDateString() === date.toDateString();
        const isInRange = startDate && endDate && date >= new Date(startDate) && date <= new Date(endDate);
        const isStartOfWeek = index % 7 === 0;
        const isEndOfWeek = index % 7 === 6;

        return (
          <div 
            key={index} 
            className={`h-8 w-8 text-center flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out
              ${isSelectedStart || isSelectedEnd ? "bg-lime-500 rounded-md" : isInRange ? `bg-lime-50 
                ${isStartOfWeek ? "rounded-l-md" : ""} 
                ${isEndOfWeek ? "rounded-r-md" : ""}` : ""}
              ${isToday ? "bg-lime-50" : ""}
            `}
            onClick={() => handleSelectDate(date)}
          >
            <p className={`
              ${isSelectedStart || isSelectedEnd ? "text-white text-medium " : ""}
              ${isCurrentMonth ? "text-gray-700 font-normal" : "text-gray-400 "}
              ${isInRange && "text-gray-700 rounded-md z-10 " }
              ${isToday && "text-lime-500 rounded-md z-10 "}
            `}>
              {date.getDate()}
            </p>
          </div>
        );
      })}
    </div>    
  );
}




const DateRangePicker = 
  ({className, startDate, endDate , setValue, placeholder, isDisabled, didError  }: IDateRangePicker) => {

  const [ open, setOpen ] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)

  useClickOutside(datePickerRef, () => setOpen(false))

  const [currentDate, setCurrentDate] = useState(startDate ? new Date(startDate) : new Date());
  const [futureDate, setFutureDate] = useState(endDate ? new Date(endDate) : () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  const generateDates = (type: string) => {
    const date = new Date(currentDate);
    const month = date.getMonth()  + (type === "current" ? 0 : 1);
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Find the Sunday that starts the week of the first day of the month
    const startDay = firstDayOfMonth.getDay();
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDay);
    
    // Find the Saturday that ends the week of the last day of the month
    const endDay = 6 - lastDayOfMonth.getDay();
    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + endDay);
    
    // Generate dates
    const dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      d.setHours(0, 0, 0, 0); // Set time to 00:00:00
      dates.push(new Date(d));
    }
    
    // Split dates into weeks
    const weeks = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }
    
    return weeks.flat();
  }

  const currentDates = generateDates("current")
  const futureDates = generateDates("future")

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    setFutureDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    setFutureDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };


  const formatDate = (isoString:Date) => {
    const date = new Date(isoString);

    const day = date.getDate();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${day}${suffix}, ${year}`;
  }


  const handleSelectDate = (date: Date) => {
    if (startDate && date.toDateString() === startDate.toDateString()) {
      // If the selected date is the same as the start date, deselect it
      // Set the end date as the new start date if end date exists
      setValue({ startDate: endDate, endDate: null });
      return;
    }
  
    if (endDate && date.toDateString() === endDate.toDateString()) {
      // If the selected date is the same as the end date, deselect it
      setValue({ startDate, endDate: null });
      return;
    }
  
    if (!startDate || (startDate && endDate)) {
      // If no start date is selected or both start and end dates are selected, reset with new start date
      setValue({ startDate: date, endDate: null });
    } else if (startDate && !endDate) {
      // If start date is set and end date is not, check if the selected date is before or after the start date
      if (date < startDate) {
        // If the selected date is before the current start date, swap the start and end dates
        setValue({ startDate: date, endDate: startDate });
      } else {
        // Otherwise, set the selected date as the end date
        setValue({ startDate, endDate: date });
      }
    }
  };
  

  

  
  return (
    <section className="w-full" ref={datePickerRef}>
      <button 

        className={`${className} relative text-left text-gray-700 bg-white h-10 text-sm px-4 flex gap-2  items-center justify-between rounded-md w-full ${
          didError
            ? "ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100"
            : isDisabled
            ? "ring-1 ring-gray-200 cursor-not-allowed"
            : "ring-1 ring-gray-200"
          }`
        }
        onClick={() => setOpen(prev => !prev)}
        type="button"
        disabled={isDisabled}
      >
        <div className="flex items-center gap-2 justify-between w-full">          
          <p className={` text-sm 
            ${didError && "text-rose-500 text-sm"} 
            ${isDisabled ? "cursor-not-allowed text-gray-400" : (startDate ? "text-gray-700 font-normal" : "text-gray-500")} `}
          >
            {startDate 
              ? `${formatDate(startDate)}${endDate ? ` - ${formatDate(endDate)}` : ''}` 
              : `Pick a ${placeholder}`
            }      
          </p>
          <CalendarIcon className={`w-4 h-4 ${didError ? "stroke-rose-500" : (isDisabled ? "stroke-gray-300" : "stroke-gray-500")}`}/>
        </div>
        <AnimatePresence>
          { open &&
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1.0 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-fit overflow-hidden absolute z-50 p-4 flex flex-col bg-white left-0 top-12 ring-1 ring-gray-200 rounded-md shadow-lg shadow-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <article className="flex gap-4">
                <header className="w-full h-8 flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className=" w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1" onClick={handlePrevMonth}>
                      <ChevronIcon  className="stroke-2 stroke-gray-500 w-6 h-6 rotate-90"/>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base font-medium">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                  <div/>
                </header>
                <header className="w-full h-8 flex items-center justify-between mb-4">
                  <div/>
                  <p className="text-gray-700 text-base font-medium">{futureDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className=" w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1" onClick={handleNextMonth}>
                      <ChevronIcon  className="stroke-2 stroke-gray-500 w-6 h-6 -rotate-90"/>
                    </div>
                  </div>
                </header>
              </article>
              <article className="flex gap-4">
                <section className="flex flex-col items-center">
                  <WeekHeader />
                  <DayGrid 
                    dates={currentDates} 
                    handleSelectDate={handleSelectDate} 
                    startDate={startDate} 
                    endDate={endDate}
                    currentDate={currentDate}
                  />
                </section>
                <section className="flex flex-col items-center ">
                  <WeekHeader />
                  <DayGrid 
                    dates={futureDates} 
                    handleSelectDate={handleSelectDate} 
                    startDate={startDate} 
                    endDate={endDate} 
                    currentDate={futureDate}
                  />
                </section>
              </article>
            </motion.div>
          }
        </AnimatePresence>
      </button>
    </section>
  )
}




export default DateRangePicker
