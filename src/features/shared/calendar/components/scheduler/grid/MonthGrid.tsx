import { MouseEvent } from "react";
import { IAppointmentResponse, IDentistData } from "@features/shared/calendar/types/appointment.types";
import { useCalendarStore } from "@features/shared/calendar/stores/calendar.stores";
import { generateDates } from "@features/shared/calendar/utils/generator.utils";
import { useViewAppointmentStore } from "@features/shared/calendar/stores/appointment.stores";
import ViewAppointmentForm from "../../forms/ViewAppointmentForm";
import MonthlyAppointmentCard from "../cards/MonthlyAppointmentCard";
import MonthAppointmentWidget from "@components/shared/calendar/MonthAppointmentWidget";

interface MonthlyGridProps {
  dentists: IDentistData[] | undefined;
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MonthlyGrid = ({ dentists }: MonthlyGridProps) => {
  
  if (!dentists) return <p>No dentist found</p>;

  const appointments = useCalendarStore((state) => state.appointments);
  const setSelectedAppointment = useViewAppointmentStore((state) => state.setSelectedAppointment);
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen);
  const setViewMainSheet = useViewAppointmentStore((state) => state.setViewMainSheet);
  const setSelectedAppointmentStatus = useViewAppointmentStore((state) => state.setSelectedAppointmentStatus);
  const currentDate = useCalendarStore((state) => state.date);
  const allDates = generateDates(currentDate);

  const handleOpen = (e: MouseEvent, appointment: IAppointmentResponse) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setViewDrawerOpen(true);
    setSelectedAppointmentStatus(appointment.appointmentData.appointmentStatus);
    setViewMainSheet({name: "MainSheet", component: <ViewAppointmentForm />})
  }

  return (
    dentists.map((dentist, index) => {
      const { dentistSchedule } = dentist;
      const cols = dentistSchedule?.length || 0;
      const dentistId = dentist._id;
      return (
        <article 
          key={index} 
          className={`w-full h-full grid `}
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {allDates.map((date, day) => {
            const dayOfWeek = daysOfWeek[date.getDay()]; // Get the day of the week
            const isScheduled = dentistSchedule?.some(schedule => schedule.day === dayOfWeek);

            // Only render the day if it's scheduled
            if (!isScheduled) return null;
            const appointmentsForDay = appointments.filter(appointment => {
              const appointmentDate = new Date(appointment.appointmentData.appointmentDate.start);
              return (
                appointmentDate.getDate() === date.getDate() &&
                appointmentDate.getMonth() === date.getMonth() &&
                appointmentDate.getFullYear() === date.getFullYear() &&
                appointment.dentistData._id === dentistId
              );
            })
            const slicedAppointments = appointmentsForDay.slice(0, 3);
            const isIncludedInCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div
                key={day}
                className={`border-r border-b relative border-gray-200 p-2 h-48 text-center 
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
            );
          })}
        </article>
      );
    })
  );
};

export default MonthlyGrid;
