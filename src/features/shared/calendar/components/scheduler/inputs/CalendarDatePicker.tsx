import { motion,AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo} from "react";
import ChevronIcon from "@icons/linear/ChevronIcon";
import DoubleChevronIcon from "@icons/linear/DoubleChevronIcon";


interface CalendarDatePickerProps {
  className: string;
  type: string;
  value: Date;
  setValue: (value: Date) => void;
  placeholder: string;
  isDisabled?: boolean;
  didError?: boolean;
}

const CalendarDatePicker = ({
  className,
  type,
  value,
  setValue, 
  placeholder, 
  isDisabled, 
  didError } : CalendarDatePickerProps,
   ) => {
  
  

  const [ open, setOpen ] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)

  const [ currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    if (type === "dateOfBirth") {
      date.setFullYear(date.getFullYear() - 18);
    }
    return date;
  });

  const generateDates = useMemo(() => {
    const date = new Date(currentDate);
    const month = date.getMonth();
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
  }, [currentDate]);

  const dates = generateDates

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear() - 1, prevDate.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear() + 1, prevDate.getMonth()));
  };

  const handleSelectDate = (date: Date) => {
    setValue(date);
  }

  const formatDate = (isoString: Date ) => {
    const date = new Date(isoString);
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()]; // Get the day of the week
  
    const day = date.getDate();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }
  
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    // Format the date to "Mon, November 24th, 2024"
    return `${dayOfWeek}, ${month} ${day}${suffix}, ${year}`;
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  return (
    <section className="w-full" ref={datePickerRef}>
      <button 
        className={`${className} relative text-left text-gray-700 bg-white h-10 text-sm px-4 flex gap-2  items-center justify-center rounded-md ${
          didError
            ? "ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100"
            : isDisabled
            ? "ring-1 ring-gray-200 cursor-not-allowed"
            : "ring-1 ring-gray-200"
        }`}        
        onClick={()=>setOpen((prev)=>!prev)}
        type="button"
        disabled={isDisabled}
      >
        <div className="flex items-center justify-center w-full">          
          <p className={` text-base font-medium
            ${isDisabled ? "cursor-not-allowed text-gray-400" : (value ? "text-gray-700 font-medium" : "text-gray-500")} 
            `}
          >
            {value ? formatDate(value) : (type === "dateOfBirth" ? "Pick a birthdate" : `Pick a ${placeholder}`)}
          </p>
        </div>
        <AnimatePresence>
          { open &&
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1.0 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-[16rem] overflow-hidden absolute p-4 flex flex-col bg-white left-0 top-12 ring-1 ring-gray-200 rounded-md shadow-lg shadow-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-8 flex items-center justify-between mb-4">
                <div className="flex items-center justify-center gap-2">
                  <div className=" w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1" onClick={handlePrevYear}>
                    <DoubleChevronIcon className="stroke-2 stroke-gray-500 w-5 h-5 "/>
                  </div>
                  <div className=" w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1" onClick={handlePrevMonth}>
                    <ChevronIcon  className="stroke-2 stroke-gray-500 w-6 h-6 rotate-90"/>
                  </div>
                </div>
                <p className="text-gray-700 text-base font-medium">{currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="rotate-180 w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1" onClick={handleNextMonth}>
                    <ChevronIcon  className="stroke-2 stroke-gray-500 w-6 h-6 rotate-90"/>
                  </div>
                  <div className="rotate-180 w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1" onClick={handleNextYear}>
                    <DoubleChevronIcon className="stroke-2 stroke-gray-500 w-5 h-5 "/>
                  </div>
                </div>
              </div>
              <div className=" h-fit grid grid-cols-7 ">
                {["Su","Mo","Tu","We","Th","Fr", "Sa"].map((day, index)=>(
                  <div className="w-8  h-8  text-center text-sm" key={index}> 
                    <p className="text-gray-500 text-sm">{day}</p>
                  </div>
                ))}
              </div>
              <div className="w-full h-fit grid grid-cols-7 gap-y-2">
                {dates.map((date, index) => {
                  const today = new Date();
                  const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                  const isSelected = new Date(value).getFullYear() === date.getFullYear() && new Date(value).getMonth() === date.getMonth() && new Date(value).getDate() === date.getDate()

                  return (
                    <div 
                      key={index} 
                      className={`h-8 w-8 text-center rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out
                        ${isSelected && "bg-lime-500 "} 
                        ${isToday && "bg-gray-100" }
                      `}
                      onClick={()=>handleSelectDate(date)}
                    >
                      <p className={`
                        ${isSelected && "text-white text-medium"} 
                        ${isCurrentMonth ? "text-gray-700 font-normal" : "text-gray-400"} 

                        `}
                      >
                        {date.getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>            
            </motion.div>
          }
        </AnimatePresence>
      </button>
    </section>
  )
}



export default CalendarDatePicker