import { CheckupDataResponseType } from "@features/shared/calendar/types/appointment.types";
import CheckIcon from "@icons/linear/CheckIcon";
import HourGlassIcon from "@icons/linear/HourGlassIcon";

type CheckupCardProps = {
  checkup: CheckupDataResponseType
  isLast: boolean
}

const CheckupCard = ({ checkup, isLast }: CheckupCardProps) => {
  const date = new Date(checkup.createdAt)
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const formattedDay = day.toString().length === 1 ? `0${day}` : day;
  const dentist = checkup.checkupAppointmentId.appointmentDentistId
  const type = checkup.checkupType
  
  return (
    <div className="w-full h-fit flex items-center flex-shrink-0">
      <div className="h-full w-12 flex items-start justify-start px-4 relative">
        <div className="relative w-[1px] border border-gray-200 h-12 flex justify-center">
          <span className="absolute w-4 h-4 flex-shrink-0 rounded-full bg-gray-400 top-8 z-20"/>
        </div>
        { !isLast && <div className="w-[1px] border border-gray-200 h-20 bottom-0 flex justify-center absolute"/> }
      </div>
      <div
        className="flex gap-6 ring-1 w-full h-fit p-6 rounded-md ring-gray-200 mb-6"
      >
        <div className="flex flex-col items-center w-16"> 
          <p className="text-gray-500 text-sm uppercase">{month}</p>
          <h1 className="text-2xl font-medium text-gray-700">{formattedDay}</h1>
        </div>
        <div className={`grid w-full
          ${type === "General" ? "grid-cols-[25%_25%_auto] " : "grid-cols-[25%_25%_25%_auto] "}  
          `}
        >
          {type !== "General" && (
            <div className="flex flex-col items-start "> 
              <label className="text-sm text-gray-500 gap-1 font-normal">
                Condition
              </label>
              <h1 className="text-md font-medium text-gray-700">
                {checkup.checkupCondition}
              </h1>
            </div>
          )}
          <div className="flex flex-col items-start "> 
            <label className="text-sm text-gray-500 gap-1 font-normal">
              Treatment
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {checkup.checkupTreatmentId.treatmentName}
            </h1>
          </div>
          <div className="flex flex-col items-start "> 
            <label className="text-sm text-gray-500 gap-1 font-normal">
              Dentist
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {dentist.dentistFullName}
            </h1>
          </div>
          <div className="w-full flex items-center justify-end">
            {checkup.checkupStatus === "Approved" ? (
              <div className=" flex items-center gap-2">
                <CheckIcon className="w-4 h-4 stroke-2 stroke-green-500"/>
                <label className="text-sm text-green-500 font-normal">
                  Done
                </label>
              </div>
            ): (
              <div className=" flex items-center gap-2">
                <HourGlassIcon className="w-4 h-4 stroke-2 stroke-amber-500"/>
                <label className="text-sm text-amber-500 font-normal">
                  Recommended
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckupCard