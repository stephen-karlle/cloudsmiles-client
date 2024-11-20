import useClickOutside from "@hooks/useClickOutside";
import ClockIcon from "@icons/linear/ClockIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, Fragment, useMemo } from "react";

interface IValue {
  start: string | null;
  end: string | null;
}

interface ITimeRangePicker {
  closingTime: string;
  openingTime: string;
  onChange?: (value: any) => void;
  value: IValue;
  didError?: boolean;
}

const TimeRangePicker = ({ closingTime, openingTime, onChange, value, didError }: ITimeRangePicker) => {
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const endButtonRef = useRef<HTMLButtonElement | null>(null);
  const [openStarting, setOpenStarting] = useState(false);
  const [openEnding, setOpenEnding] = useState(false);

  const timeStringToHoursAndMinutes = (time: string): [number, number] => {
    const [hours, minutes] = time.split(':').map(Number);
    return [hours, minutes];
  };

  const generateStartingTime = (startingTime: string, closingTime: string, value: IValue) => {
    let times = [];
    let [startHour, startMinute] = timeStringToHoursAndMinutes(startingTime);
    let [endHour, endMinute] = timeStringToHoursAndMinutes(closingTime);
    let [valueEndHour, valueEndMinute] = value.end ? value.end.split(':').map(Number) : [endHour, 60];
  
    // Adjust endHour and endMinute based on value.end
    if (value.end) {
      if (valueEndHour < endHour || (valueEndHour === endHour && valueEndMinute < endMinute)) {
        endHour = valueEndHour;
        endMinute = valueEndMinute;
      }
    }
  
    for (let i = startHour; i <= endHour; i++) {
      let maxMinute = i === endHour ? endMinute : 60;
      for (let j = i === startHour ? startMinute : 0; j < maxMinute; j += 15) {
        times.push(`${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`);
      }
    }
    return times;
  };

  const generateEndingTime = (startingTime: string, closingTime: string, value: IValue) => {
    let times = [];
    let [startHour, startMinute] = timeStringToHoursAndMinutes(startingTime);
    let [endHour, endMinute] = timeStringToHoursAndMinutes(closingTime);
    let [valueStartHour, valueStartMinute] = value.start ? value.start.split(':').map(Number) : [startHour, 0];
  
    // Adjust startHour and startMinute based on value.start
    if (value.start) {
      if (valueStartHour > startHour || (valueStartHour === startHour && valueStartMinute > startMinute)) {
        startHour = valueStartHour;
        startMinute = valueStartMinute;
      }
    }
  
    // Add 15 minutes to the starting time
    startMinute += 15;
    if (startMinute >= 60) {
      startHour += 1;
      startMinute -= 60;
    }
  
    for (let i = endHour; i >= startHour; i--) {
      let minMinute = i === startHour ? startMinute : 0;
      let maxMinute = i === endHour ? endMinute : 45;
      for (let j = maxMinute; j >= minMinute; j -= 15) {
        times.push(`${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`);
      }
    }
    return times.reverse();
  };

  useClickOutside(startButtonRef, () => setOpenStarting(false));
  useClickOutside(endButtonRef, () => setOpenEnding(false));

  const startingTimeList = useMemo(() => generateStartingTime(openingTime, closingTime, value), [openingTime, closingTime, value]);
  const endingTimeList = useMemo(() => generateEndingTime(openingTime, closingTime, value), [openingTime, closingTime, value]);
  const timeCategorizer = (time: string) => {
    const [hour] = time.split(':').map(Number);
    let period = 'AM';
    let category = 'Morning';
  
    if (hour >= 12) {
      period = 'PM';
    }
    if (hour >= 12 && hour < 19) {
      category = 'Noon';
    }
  
    return { time, category, period };
  };
  

  const categorizedStartingTimes = useMemo(() => startingTimeList.map(time => timeCategorizer(time)), [startingTimeList]);
  const categorizedEndingTimes = useMemo(() => endingTimeList.map(time => timeCategorizer(time)), [endingTimeList]);

  const defaultStartingTime = categorizedStartingTimes.length > 0 ? categorizedStartingTimes[0].time : openingTime;

  const timeFormatter = (time: string) => {
    if (!time) return '-- --';
    const [hours, minutes] = time.split(':').map(num => parseInt(num));

    let formattedHours = hours > 12 ? hours - 12 : hours;
    formattedHours = formattedHours === 0 ? 12 : formattedHours; // For 12 AM/PM
    const amPm = hours < 12 ? 'AM' : 'PM'; // Determine AM or PM
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  };

  return (
    <section className="flex items-center justify-center gap-4 w-full ">
      <button
        ref={startButtonRef}
        className="relative text-left text-gray-700 bg-white ring-1 ring-gray-200 rounded-md h-10 text-sm px-4 w-full flex justify-between items-center"
        onClick={() => setOpenStarting(prev => !prev)}
        type="button"
      >
        <p className="text-sm text-gray-700">
          {value.start ? timeFormatter(value.start) : timeFormatter(defaultStartingTime)}
        </p>
        <ClockIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
        <AnimatePresence>
          {openStarting &&
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1.0 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="overflow-clip w-full px-2 py-2 absolute z-50 bg-white left-0 top-12 ring-1 h-fit max-h-40 overflow-y-scroll ring-gray-200 rounded-md shadow-lg shadow-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center">
                {categorizedStartingTimes.map((time, index, array) => {
                  const previousCategory = index > 0 ? array[index - 1].category : null;
                  return (
                    <Fragment key={index}>
                      {time.category !== previousCategory && <p className="text-xs text-gray-500 w-full text-start px-1 pb-2 font-medium">{time.category}</p>}
                      <span
                        className="h-8 rounded-md px-2 w-full hover:bg-gray-100 flex items-center justify-start"
                        onClick={() => {
                          setOpenStarting(false);
                          onChange && onChange({ start: time.time });
                        }}
                      >
                        <p className="text-sm text-gray-500">{timeFormatter(time.time)}</p>
                      </span>
                    </Fragment>
                  );
                })}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </button>
      <p className="text-sm text-gray-500">to</p>
      <button
        ref={endButtonRef}
        className={`relative text-left bg-white ring-1 rounded-md h-10 text-sm px-4 w-full flex justify-between items-center ${didError ? ' ring-rose-500 ' : ' ring-gray-200 '} `}
        type="button"
        onClick={() => setOpenEnding(prev => !prev)}
      >
        <p className={`text-sm ${didError ? " text-rose-500 " : " text-gray-700 "}`}>
          {value.end ? timeFormatter(value.end) : "-- --"}
        </p>
        <ClockIcon className={`w-4 h-4 stroke-2 ${didError ? "stroke-rose-500  " : " stroke-gray-500 "} `} />
        <AnimatePresence>
          {openEnding &&
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1.0 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden w-full px-2 py-2 absolute z-50 bg-white left-0 top-12 ring-1 h-fit max-h-40 overflow-y-scroll ring-gray-200 rounded-md shadow-lg shadow-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center">
                {categorizedEndingTimes.map((time, index, array) => {
                  const previousCategory = index > 0 ? array[index - 1].category : null;
                  return (
                    <Fragment key={index}>
                      {time.category !== previousCategory && <p className="text-xs text-gray-500 w-full text-start px-1 pb-2 font-medium">{time.category}</p>}
                      <span
                        className="h-8 rounded-md px-2 w-full hover:bg-gray-100 flex items-center justify-start"
                        onClick={() => {
                          setOpenEnding(false);
                          onChange && onChange({ end: time.time });
                        }}
                      >
                        <p className="text-sm text-gray-500">{timeFormatter(time.time)}</p>
                      </span>
                    </Fragment>
                  );
                })}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </button>
    </section>
  );
};

export default TimeRangePicker;
