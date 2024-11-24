import { useState } from "react";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import { getDentistDateAvailability, updateChainData } from "../../services/chatbot.services";
import { useQuery } from "@tanstack/react-query";
import { DentistDateAvailabilityResponse } from "@features/admin/staff/types/schedule.types";
import { useUserStore } from "@stores/user.store";
import { generateDates } from "@features/shared/calendar/utils/generator.utils";
import { convertDateToISOString } from "@utils/date.utils";
import Button from "@components/ui/Button";
import ChevronIcon from "@icons/linear/ChevronIcon";
import DoubleChevronIcon from "@icons/linear/DoubleChevronIcon";
import clsx from "clsx"; // Import clsx here

interface IDateMessage {
  handleSendMessage: (prompt: string) => void;
}

const DateMessage = ({ handleSendMessage }: IDateMessage) => {
  const user = useUserStore((state) => state.user);
  const patientId = user._id;

  const [value, setValue] = useState<Date | null>();
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    return date;
  });

  const { data, isLoading } = useQuery<DentistDateAvailabilityResponse>({
    queryKey: ["chatbotDentistDateAvailabilityData", currentDate],
    queryFn: async () => {
      const res = await getDentistDateAvailability(patientId, currentDate.toISOString());
      return res;
    },
  });

  const dates = generateDates(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const handlePrevYear = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth()));
  };

  const handleSelectDate = (date: Date | null) => {
    setValue(date);
  };

  const handleSubmit = async () => {
    if (!value) return;

    await updateChainData({
      appointmentDate: convertDateToISOString(value),
      patientId: patientId,
    });

    const formattedDate = formatISODateWithStringWithSuffix(value ?? "");
    const prompt = `I would like to set my appointment at ${formattedDate}.`;
    handleSendMessage(prompt);
  };

  if (isLoading ) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const availability = data.availability
  const schedule = data.schedule
  const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



  return (
    <article className="border-t border-gray-200 p-4 pt-6 mt-4 flex flex-col">
      <section className="flex items-center justify-between gap-4">
        <div
          className="w-full overflow-hidden p-4 flex flex-col bg-white left-0 ring-1 ring-gray-200 rounded-md "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-8 flex items-center justify-between mb-4">
            <div className="flex items-center justify-center gap-2">
              <button
                className="w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1"
                onClick={handlePrevYear}
              >
                <DoubleChevronIcon className="stroke-2 stroke-gray-500 w-5 h-5" />
              </button>
              <button
                className="w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1"
                onClick={handlePrevMonth}
              >
                <ChevronIcon className="stroke-2 stroke-gray-500 w-6 h-6 rotate-90" />
              </button>
            </div>
            <p className="text-gray-700 text-base font-medium">
              {currentDate.toLocaleString("default", { month: "short", year: "numeric" })}
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                className="rotate-180 w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1"
                onClick={handleNextMonth}
              >
                <ChevronIcon className="stroke-2 stroke-gray-500 w-6 h-6 rotate-90" />
              </button>
              <button
                className="rotate-180 w-6 h-6 rounded-md ring-1 ring-gray-200 flex items-center justify-center p-1"
                onClick={handleNextYear}
              >
                <DoubleChevronIcon className="stroke-2 stroke-gray-500 w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="h-fit grid grid-cols-7">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
              <div className="w-8 h-8 text-center text-sm" key={index}>
                <p className="text-gray-500 text-sm">{day}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-fit grid grid-cols-7 gap-y-2">
            {dates.map((date, index) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isSelected =
                value &&
                new Date(value).getFullYear() === date.getFullYear() &&
                new Date(value).getMonth() === date.getMonth() &&
                new Date(value).getDate() === date.getDate();
              const isPastDate = date < today;

              // Compare using getTime() for exact match
              const availabilityObj = availability.find((available) => {
                const availableDate = new Date(available.date);
                return availableDate.getTime() === date.getTime(); // Ensure exact match
              });

              const isNotAvailable = schedule && !schedule.some((schedule) => schedule.day === dayMap[date.getDay()]);

              const isDisabled = isPastDate || isNotAvailable;
              const isFull = availabilityObj?.isFull || false;
              const isAlmostFull = availabilityObj?.isAlmostFull || false;

              return (
                <div
                  key={index}
                  className={clsx(
                    "h-8 w-8 text-center rounded-md flex items-center justify-center relative transition-all duration-300 ease-in-out",
                    {
                      "bg-lime-500": isSelected,
                      "bg-rose-100 cursor-not-allowed": isFull,
                      "bg-amber-100": isAlmostFull,
                      "text-gray-400 cursor-not-allowed": isDisabled,
                      "bg-gray-100": isToday,
                      "bg-rose-50": isFull,
                      "cursor-pointer": !isDisabled && !isFull,
                    }
                  )}
                  onClick={() => !isFull && !isDisabled && handleSelectDate(date)}
                >
                  {isFull && <div className="w-2 h-2 bg-red-500 rounded-full absolute -bottom-1" />}
                  {!isPastDate && !isSelected && !isFull && isAlmostFull && (
                    <div className="w-2 h-2 bg-amber-500 rounded-full absolute -bottom-1" />
                  )}
                    <p
                      className={clsx(
                        {
                          "text-rose-500 cursor-not-allowed": isFull, // High priority: applied first
                          "text-amber-500": isAlmostFull,            // Applied only if `isFull` is false
                          "text-gray-400 cursor-not-allowed": (isDisabled || !isToday || isPastDate) && !isFull && !isAlmostFull,
                          "text-gray-700 font-normal": isCurrentMonth && !isDisabled && !isFull && isToday,
                          "text-white font-medium": isSelected,
                        }
                      )}
                    >
                      {isFull ? "F" : date.getDate()}
                    </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center gap-8 pt-4">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <p className="text-rose-500 text-sm">Fully booked</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-amber-500 rounded-full" />
          <p className="text-amber-500 text-sm">Limited Spots</p>
        </div>
      </section>
      <hr className="my-4 border-gray-200" />
      <section className="pb-4">
        <p className="text-gray-500 text-sm text-center">
          Note: If you don't see any available dates, it means the dentist is not available on that day.
        </p>
      </section>
      <Button
        className="w-full h-10"
        variant={!value ? "disabled" : "primary"}
        onClick={handleSubmit}
        disabled={!value}
      >
        Submit
      </Button>
    </article>
  );
};

export default DateMessage;
