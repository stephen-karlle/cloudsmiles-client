import { calculateNumberOfTotalAppointments } from "../utils/calendar.utils";
import { useCalendarStore } from "../stores/calendar.stores";
import ChevronIcon from "@icons/linear/ChevronIcon"
import CalendarIcon from "@icons/linear/CalendarIcon";
import ClockIcon from "@icons/linear/ClockIcon";
import CalendarDatePicker from "./scheduler/inputs/CalendarDatePicker";

const CalendarHeader = () => {

  const date = useCalendarStore((state) => state.date);
  const setDate = useCalendarStore((state) => state.setDate);
  const activeView = useCalendarStore((state) => state.activeView);
  const setActiveView = useCalendarStore((state) => state.setActiveView);
  const appointments = useCalendarStore((state) => state.appointments);

  const handlePreviousDate = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    setDate(newDate);
  }

  const handleNextDate = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    setDate(newDate);
  }

  const handleToday = () => {
    setDate(new Date())
  }

  const totalDayAppointments = calculateNumberOfTotalAppointments(appointments, date)
  const totalWeekAppointments = appointments.length
  const appointmentCount = activeView === "Day" ? totalDayAppointments : totalWeekAppointments


  return (
    <article className="relative h-20 z-[60] w-full flex items-center justify-between gap-2 p-6 bg-white border-b border-ring-200">
      <section className="flex items-center justify-start gap-4">
        <div className="ring-1 h-8 w-8 ring-gray-200 flex-shrink-0 p-1 bg-white rounded-md">
          <CalendarIcon className=" stroke-1 stroke-gray-500 w-full h-full" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <h1 className="text-green-950 text-xl tracking-tight font-bold ">{appointmentCount}</h1>
          <p className="text-gray-500 text-sm">Total appointments</p>
        </div>
      </section>
      <section className="w-fit flex items-center justify-between gap-4 ">
        <button className="text-gray-950 ring-1 rounded-md ring-gray-200 p-1" onClick={handlePreviousDate}>
          <ChevronIcon className="stroke-2 stroke-gray-500 rotate-90"/>
        </button>
        <CalendarDatePicker 
          value={date} 
          setValue={setDate}
          type="date"
          className="w-64"
          placeholder="date" 
        />
        <button className="text-gray-950 rotate-90 ring-1 rounded-md ring-gray-300 p-1" onClick={handleNextDate}>
          <ChevronIcon className="stroke-2 stroke-gray-500 rotate-180"/>
        </button>
        <button className="text-base text-gray-700 ring-1 ring-gray-200 rounded-md px-4 py-1" onClick={handleToday}>Today</button>
      </section>

      <section className="w-fit flex items-center justify-center gap-4 ">
        <div className="p-1 bg-gray-50 rounded-md flex-shrink-0">
          {["Day", "Week", "Month"].map((view, index) => {
            const isActive = activeView === view
            return(
              <button 
                key={index} 
                className={` h-7 px-3 text-sm rounded-md w-16 font-normal
                  ${isActive ? "text-gray-700 bg-white shadow-md shadow-gray-200 font-medium " : "text-gray-500 "}  
                `}
                onClick={()=>setActiveView(view)}
              >
                {view}
              </button>
            )
          })}
        </div>
      </section>

      {activeView !== "Month" && (
        <div className="flex flex-col items-center justify-center h-20 border-r border-t border-gray-200 absolute left-0 -bottom-20  z-50 w-[96px] bg-white">
          <p className="text-base font-medium text-gray-700">GMT</p>
          <p className="text-sm text-gray-500">+08:00</p>
        </div>
      )}
      {activeView === "Week" &&
        <div className="flex flex-col items-center justify-center h-12 border-b border-r  border-gray-200 absolute left-0 top-40 z-50 w-[96px] bg-white">
          <ClockIcon className="stroke-2 w-5 h-5 stroke-gray-500" />
        </div>
      }
    </article>
  )
}

export default CalendarHeader

