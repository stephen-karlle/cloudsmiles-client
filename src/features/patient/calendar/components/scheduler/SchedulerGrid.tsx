import { generateDates, generateWeekDates } from "@features/shared/calendar/utils/generator.utils";
import { useUserStore } from "@stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { usePatientStore } from "../../stores/patient.store";
import { getPatientMonthlyAppointments } from "../../services/patient.services";
import { isToday } from "@utils/date.utils";
import MonthlyAppointmentCard from "@features/shared/calendar/components/scheduler/cards/MonthlyAppointmentCard";
import { useDrawerStore } from "@stores/drawer.store";
import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types";
import { MouseEvent } from "react";
import MonthAppointmentWidget from "@components/shared/calendar/MonthAppointmentWidget";


const SchedulerGrid = () => {
  
  const currentDate = usePatientStore((state) => state.date)
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const setSelectedAppointment = usePatientStore((state) => state.setSelectedAppointment)

  const user = useUserStore((state) => state.user)
  const allDates = generateDates(currentDate);

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["patientAppointmentsData", currentDate],
    queryFn: () => getPatientMonthlyAppointments(user._id, currentDate),
  })

  if (isLoading) return <div>Loading...</div>

  const dates = generateWeekDates(currentDate);

  const handleOpen = (e: MouseEvent, appointment: IAppointmentResponse) => {
    e.preventDefault()
    setSelectedAppointment(appointment)
    setDrawerOpen(true)
  }

  return (
    <article className="flex flex-col h-fit relative">
      <section 
        style={{gridTemplateColumns: `repeat(7, 250px)`}}
        className="h-12 grid grid-flow-col sticky top-0 flex-shrink-0 z-50 bg-white"
        >
        {dates.map((date, index) => {
          const today = isToday(date)

          return (
            <div key={index} 
              className={`
                w-full h-full border-r border-b border-gray-200 flex items-center justify-center
              `}
            >
              <span className={`ml-1 text-sm tracking-wide
                ${today ? "  text-lime-500 font-medium " : " text-gray-500 "}  
              `}>
                {date.toLocaleDateString('en-US', { weekday: 'long' })}                    
              </span>

            </div>
          )}
          )
        }
      </section>
      <section 
        className={`w-fit h-fit grid bg-rose-50`}
        style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
      >
        {allDates.map((date, day) => {
          const isIncludedInCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();

          

          const appointmentsForDay = appointments ? appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointmentData.appointmentDate.start);
            return (
              appointmentDate.getDate() === date.getDate() &&
              appointmentDate.getMonth() === date.getMonth() &&
              appointmentDate.getFullYear() === date.getFullYear()
            );
          }) : []
          const slicedAppointments = appointmentsForDay.slice(0, 3);

          return (
            <div
              key={day}
              className={`border-r border-b relative border-gray-200 p-2 w-[250px] h-48 text-center flex-shrink-0  overflow-hidden
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
              
              <div className="flex flex-col justify-end h-full items-end gap-2">
                <span 
                  className={`text-xs  absolute top-2 right-2 rounded-full p-1
                    ${!isIncludedInCurrentMonth ? "text-gray-500" : "text-gray-700"}
                    ${isToday && " text-rose-500 underline"}
                  `}
                >
                  {date.getDate()}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );

};

export default SchedulerGrid
