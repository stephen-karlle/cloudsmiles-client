import { MouseEvent } from 'react';
import { formatTimeRange } from '@features/shared/calendar/utils/calendar.utils';
import CheckIcon from '@icons/linear/CheckIcon';
import ClockIcon from '@icons/linear/ClockIcon';
import CloseIcon from '@icons/linear/CloseIcon';
import HourGlassIcon from '@icons/linear/HourGlassIcon';

type DayAppointmentWidgetProps = {
  fullName: string;
  status: string;
  start: Date;
  end: Date;
  handleOpen: (e: MouseEvent) => void;
  type: "day" | "week" | "month";
};

const DayAppointmentWidget= ({
  fullName,
  status,
  start,
  end,
  handleOpen,
  type 
}: DayAppointmentWidgetProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Scheduled":
        return {
          background: "bg-amber-50",
          iconBackground: "bg-amber-500",
          textColor: "text-amber-500",
          strokeColor: "stroke-amber-500"
        };
      case "Cancelled":
        return {
          background: "bg-red-50",
          iconBackground: "bg-red-500",
          textColor: "text-red-500",
          strokeColor: "stroke-red-500"
        };
      case "Confirmed":
        return {
          background: "bg-sky-50",
          iconBackground: "bg-sky-500",
          textColor: "text-sky-500",
          strokeColor: "stroke-sky-500"
        };
      case "Finished":
        return {
          background: "bg-green-50",
          iconBackground: "bg-green-500",
          textColor: "text-green-500",
          strokeColor: "stroke-green-500"
        };
      default:
        return {
          background: "bg-gray-50",
          iconBackground: "bg-gray-500",
          textColor: "text-gray-500",
          strokeColor: "stroke-gray-500"
        };
    }
  };

  const { 
    background, 
    iconBackground, 
    textColor, 
    strokeColor 
  } = getStatusStyles(status);

  return (
    <section 
      className={`w-full h-full flex flex-col items-start cursor-pointer rounded-lg px-2 py-1 transition-colors duration-300 ease-in-out ${background}`}
      onMouseDown={(e) => handleOpen(e)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center ${iconBackground}`}
          >              
            {(status === "Scheduled" || status === "Confirmed") && <HourGlassIcon className="w-3 h-3 stroke-[3px] stroke-white" />}
            {status === "Finished" && <CheckIcon className="w-4 h-4 stroke-[3px] stroke-white" />}
            {status === "Cancelled" && <CloseIcon className="w-4 h-4 stroke-[3px] stroke-white" />}
          </div>
          <p className={`${textColor} text-base tracking-wide font-normal`}>{fullName}</p>
        </div>
        {type === "day" &&
          <div className="flex items-center justify-center gap-1">
            <ClockIcon className={`stroke-2 w-4 h-4 ${strokeColor}`} />
            <p className={`text-sm tracking-wide ${textColor}`}>{formatTimeRange(start, end)}</p>
          </div>
        }
      </div>
    </section>  
  );
};

export default DayAppointmentWidget;
