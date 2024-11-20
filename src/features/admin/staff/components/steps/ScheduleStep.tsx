import ErrorMessage from '@components/ui/ErrorMessage';
import Switch from '@components/ui/Switch';
import TimeRangePicker from '@components/ui/TimeRangePicker';
import { formatTimeToString } from '@features/shared/calendar/utils/calendar.utils';
import NotAllowedIcon from '@icons/linear/NotAllowedIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';

type ScheduleStepProps = {
  type: "dentist" | "assistant";
}

const ScheduleStep = ({ type }: ScheduleStepProps) => {
  const { 
    control, 
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const openingTime = 9;
  const closingTime = 19;

  const formattedOpeningTime = formatTimeToString(openingTime);
  const formattedClosingTime = formatTimeToString(closingTime);


  const timeFormatter = (startingTime: number, closingTime: number) => {
    const formatTime = (time: number) => time < 10 ? `0${time}:00` : `${time}:00`;
    return {
      start: formatTime(startingTime),
      end: formatTime(closingTime)
    };
  };

  // Dynamically set error status based on type
  const didError = !!errors?.[`${type}Schedule`]?.message;

  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll px-6 py-4 overflow-x-hidden outline-none">
      <label className="text-sm font-medium text-gray-500 tracking-tight mb-2">Working Days</label>
      <Controller
        name={`${type}Schedule`} // Use dynamic name based on type
        control={control}
        defaultValue=""
        render={({ field }) => {
          const isDayInField = (day: string) => Array.isArray(field.value) && field.value.some((item: { day: string }) => item.day === day);

          const updateField = (day: string, newValue: { start?: string, end?: string }) => {
            const updatedValue = field.value.map((item: { day: string, start?: string, end?: string }) => {
              if (item.day === day) {
                return { ...item, start: newValue.start ? newValue.start : item.start, end: newValue.end ? newValue.end : item.end };
              }
              return item;
            });
            field.onChange(updatedValue);
          };

          return (
            <div className="grid grid-cols-1 items-center justify-between w-full">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <section key={index} className="grid grid-cols-[40%_60%] items-center h-16 w-full">
                  <div className="flex items-center w-full gap-3">
                    <Switch 
                      checked={isDayInField(day)}
                      onChange={(isChecked) => {
                        clearErrors(`${type}Schedule`); // Clear errors dynamically
                        if (isChecked) {
                          const defaultTime = timeFormatter(openingTime, closingTime);
                          field.onChange([...field.value, { day, end: defaultTime.end, start: defaultTime.start }]);
                        } else {
                          field.onChange(field.value.filter((item: { day: string }) => item.day !== day));
                        }
                      }}
                      didError={didError}
                    />
                    <label className={` ${didError ? " text-rose-500 " : "text-gray-700 "} text-sm font-medium`}>{day}</label>
                  </div>
                  <AnimatePresence>
                    {isDayInField(day) ? (
                      <motion.section
                        className="w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                      >
                        <TimeRangePicker
                          closingTime={formattedClosingTime} 
                          openingTime={formattedOpeningTime}
                          onChange={(newValue) => updateField(day, newValue)}
                          value={(() => {
                            const currentItem = field.value.find((item: { day: string, start?: string, end?: string }) => item.day === day);
                            return currentItem ? { start: currentItem.start || '', end: currentItem.end || '' } : { start: '', end: '' };
                          })()}
                        />
                      </motion.section>
                    ) : (
                      <motion.div
                        className={`px-4 flex items-center justify-start ring-1 rounded-md h-10 gap-2 w-full 
                          ${errors?.[`${type}Schedule`]?.message ? "ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100" : "ring-gray-200"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                      >
                        <NotAllowedIcon className={`w-4 h-4 stroke-2 ${errors?.[`${type}Schedule`]?.message ? "stroke-rose-500" : "stroke-gray-500"}`} />
                        <p className={`${errors?.[`${type}Schedule`]?.message ? "text-rose-500" : "text-gray-500"} text-sm`}>Off Duty</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              ))}
            </div>
          );
        }}
      />
      <ErrorMessage message={errors?.[`${type}Schedule`]?.message} />
    </section>
  );
};

export default ScheduleStep;
