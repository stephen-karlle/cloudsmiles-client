import { MouseEvent } from "react";
import { useDrawerStore } from "@stores/drawer.store";
import { ISchedule } from "@features/admin/staff/types/schedule.types";
import { generateDates, generateWeekDates } from "@features/shared/calendar/utils/generator.utils";
import { isWorkingDay } from "@features/shared/calendar/utils/identifier.utils";
import { getDentistMonthlyAppointments } from "../../services/calendar.store";
import { useUserStore } from "@stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { useDentistCalendarStore } from "../../stores/calendar.store";
import { Fragment } from "react/jsx-runtime";
import { isToday } from "date-fns";
import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types";
import MonthlyAppointmentCard from "@features/shared/calendar/components/scheduler/cards/MonthlyAppointmentCard";
import MonthAppointmentWidget from "@components/shared/calendar/MonthAppointmentWidget";

type SchedulerGridProps = {
  schedules: ISchedule[]
}

const SchedulerGrid = ({ schedules } : SchedulerGridProps) => {
  
  const user = useUserStore((state) => state.user)
  const currentDate = useDentistCalendarStore((state) => state.date)
  const setSelectedAppointment = useDentistCalendarStore((state) => state.setSelectedAppointment)
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const allDates = generateDates(currentDate);

  const { data: appointments, isLoading } = useQuery<IAppointmentResponse[]>({
    queryKey: ["dentistAppointmentsData",currentDate],
    queryFn: () => getDentistMonthlyAppointments(user._id, currentDate),
  })

  if (isLoading) return <div>Loading...</div>

  const dates = generateWeekDates(currentDate)
  const gridColStyle = `repeat(7, 250px)`;

  const handleOpen = (e: MouseEvent, appointment: IAppointmentResponse) => {
    e.stopPropagation();
    setSelectedAppointment(appointment)
    setDrawerOpen(true)
  }


  return (
    <article className="w-full h-full flex flex-col">
      <section className="w-full h-fit sticky top-0 bg-white z-10">
        <div 
          style={{gridTemplateColumns: gridColStyle }}
          className="h-12 grid grid-flow-col border-r border-b border-gray-200  bg-white" 
        >
          {dates.map((date, index) => {
            const today = isToday(date)
            const isWorkDay = isWorkingDay(date, schedules)
                    
            return (
              <div key={index} 
                className={`
                  w-full h-full border-r border-gray-200 flex items-center justify-center
                `}
              >
                {isWorkDay ? (
                  <Fragment>
                    <span className={`flex items-center justify-center font-normal
                      ${today ? " text-white rounded-full p-1 bg-lime-500  w-8 h-8 " : " text-gray-500 "}  
                    `}>
                      {date.getDate()}
                    </span>
                    <span className={`ml-1 text-sm tracking-wide
                      ${today ? "  text-lime-500 font-medium " : " text-gray-500 "}  
                    `}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}                    
                    </span>
                  </Fragment>
                ) : (
                  <div className="flex items-center justify-center  bg-gray-100 w-full h-full">
                    <span className="text-xs uppercase text-gray-500 px-2 py-1 rounded-md font-medium ">
                      DAY OFF
                    </span>
                  </div>
                )}
              </div>
            )}
            )
          }
        </div>
      </section>
      <section 
        className={`w-fit h-fit grid flex-shrink-0 `}
        style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
      >
        {allDates.map((date, day) => {
           const appointmentsForDay = appointments ? appointments.filter(appointment => {
             const appointmentDate = new Date(appointment.appointmentData.appointmentDate.start);
             return (
               appointmentDate.getDate() === date.getDate() &&
               appointmentDate.getMonth() === date.getMonth() &&
               appointmentDate.getFullYear() === date.getFullYear()
             )
           }) : []
           const slicedAppointments = appointmentsForDay.slice(0, 3);
           const isIncludedInCurrentMonth = date.getMonth() === currentDate.getMonth();
           const isToday = date.toDateString() === new Date().toDateString();
           const isWorkDay = isWorkingDay(date, schedules)
           return (
            isWorkDay ? (             
             <div
               key={day}
               className={`border-r border-b relative border-gray-200 p-2 h-48 text-center  flex-shrink-0 w-[250px]
                 ${!isIncludedInCurrentMonth ? "bg-gray-50" : "bg-white"}
                 `}
             >
               <div className="flex flex-col justify-end h-full items-end gap-2">
                 {slicedAppointments.map((appointment, index) => {
                   const status = appointment.appointmentData.appointmentStatus;
                   return (
                     <MonthAppointmentWidget
                       key={index}
                       status={status}
                       handleOpen={(e) => handleOpen(e, appointment)}
                       fullName={appointment.patientData.patientFullName}
                     />
                   );
                 })}
                 <span 
                   className={`text-xs  absolute top-2 right-2 rounded-full p-1
                     ${!isIncludedInCurrentMonth ? "text-gray-500" : "text-gray-700"}
                     ${isToday && " text-rose-500 underline"}
                   `}
                 >
                   {date.getDate()}
                 </span>

                 {appointmentsForDay.length > 3 && (
                   <MonthlyAppointmentCard 
                     appointments={appointmentsForDay}
                   />
                 )}

               </div>
             
             </div>
            ) : (
              <div
                key={day}
                className="border-r border-b stripes-dentist-dayoff border-gray-200 p-2 w-[250px] h-48 text-center flex-shrink-0 "
              >
                <div className="flex items-center justify-center h-full">
                  <span 
                    className="text-xs  rounded-full p-1 text-gray-500 px-2 py-1 uppercase font-medium bg-gray-100  "
                  >
                    Unavailable
                  </span>
                </div>
              </div>
            )
           );
         })}
      </section>
    </article>
  );

};

export default SchedulerGrid
