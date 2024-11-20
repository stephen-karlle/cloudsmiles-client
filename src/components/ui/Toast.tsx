import { ReactNode } from "react";

type Status = 'success' | 'error' | 'warning' | 'info';

interface IToast {
  title: string;
  subtitle: string;
  status: Status;
  message: string;
  icon?: ReactNode;
}

const statusColorMap: Record<Status, string> = {
  success: "bg-green-500",
  error: "bg-rose-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

const Toast= ({title, message, subtitle, status }: IToast) => {
  const colorClass = statusColorMap[status];
  
  return (
    <section className={`w-[22rem] h-[4.5rem] rounded-md ring-1 shadow-lg shadow-gray-200 ring-gray-200  bg-white overflow-clip flex items-center justify-center ${colorClass}`}>
      <hr className={`absolute left-4 w-1 rounded-lg h-[60%] ${colorClass}`} />
      <div className="ml-8 h-full w-full flex flex-col items-start justify-center ">
        <h1 className="text-gray-700 font-medium text-sm truncate w-full max-w-[18rem] text-ellipsis">{title}
          <span className="font-normal">{" " + message}</span>
        </h1>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </section>
  )
}

export default Toast