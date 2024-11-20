import { MouseEvent } from 'react';
import CheckIcon from '@icons/linear/CheckIcon';
import CloseIcon from '@icons/linear/CloseIcon';
import HourGlassIcon from '@icons/linear/HourGlassIcon';

type AppointmentCardProps = {
  fullName: string;
  status: string;
  handleOpen: (e: MouseEvent) => void;
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Scheduled":
      return {
        background: "bg-amber-50",
        iconBackground: "bg-amber-500",
        textColor: "text-amber-500"
      };
    case "Cancelled":
      return {
        background: "bg-red-50",
        iconBackground: "bg-red-500",
        textColor: "text-red-500"
      };
    case "Confirmed":
      return {
        background: "bg-sky-50",
        iconBackground: "bg-sky-500",
        textColor: "text-sky-500"
      };
    case "Finished":
      return {
        background: "bg-green-50",
        iconBackground: "bg-green-500",
        textColor: "text-green-500"
      };
    default:
      return {
        background: "bg-gray-50",
        iconBackground: "bg-gray-500",
        textColor: "text-gray-500"
      };
  }
};

const MonthAppointmentWidget = ({
  fullName,
  status,
  handleOpen
}: AppointmentCardProps) => {
  const { background, iconBackground, textColor } = getStatusStyles(status);

  return (
    <button 
      className={`w-full flex flex-col items-start h-[30px] cursor-pointer rounded-lg px-2 py-1 transition-colors duration-300 ease-in-out ${background}`}
      onClick={(e) => handleOpen(e)}
    >
      <div className="flex items-center justify-start gap-2 w-full">
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center ${iconBackground}`}
        >
          {(status === "Scheduled" || status === "Confirmed") && <HourGlassIcon className="w-3 h-3 stroke-[3px] stroke-white" />}
          {status === "Finished" && <CheckIcon className="w-4 h-4 stroke-[3px] stroke-white" />}
          {status === "Cancelled" && <CloseIcon className="w-4 h-4 stroke-[3px] stroke-white" />}
        </div>
        <label className={`text-base text-start font-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] ${textColor}`}>
          {fullName}
        </label>
      </div>
    </button>
  );
};

export default MonthAppointmentWidget;
