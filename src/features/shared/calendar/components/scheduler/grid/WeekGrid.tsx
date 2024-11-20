import { Fragment } from "react/jsx-runtime";
import { useCalendarStore } from "../../../stores/calendar.stores";
import { IDentistData } from "@features/shared/calendar/types/appointment.types";
import { useAdminStore } from "@stores/admin/admin.store";
import { useNewAppointmentStore } from "@features/shared/calendar/stores/appointment.stores";
import AddAppointmentForm from "../../forms/AddAppointmentForm";


interface ICalendarGrid {
  dentists: IDentistData[];
}


const WeekGrid = ({ dentists }: ICalendarGrid ) => {
  const date = useCalendarStore((state) => state.date);
  const openingTime = useCalendarStore((state) => state.openingTime);
  const closingTime = useCalendarStore((state) => state.closingTime);

  const setDrawerOpen = useAdminStore((state) => state.setDrawerOpen);
  const setMainSheet = useAdminStore((state) => state.setMainSheet);

  const setSelectedDentist = useNewAppointmentStore((state) => state.setSelectedDentist);
  const setSelectedTimeIndex = useNewAppointmentStore((state) => state.setSelectedTimeIndex);
  const setSelectedDayIndex = useNewAppointmentStore((state) => state.setSelectedDayIndex);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);

  const weekGridCols = dentists.length;


  const handleSelect = (dentistIndex: number, timeIndex: number, dayIndex: number) => {
    if (!dentists) return;
    setSelectedDentist(dentists[dentistIndex])
    setSelectedTimeIndex(timeIndex)
    setSelectedDayIndex(dayIndex)
    const dentistSchedule = dentists[dentistIndex].dentistSchedule || [];
    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const dentistScheduleInDays = dentistSchedule.map((schedule) => schedule.day) 
    const targetIndex = daysOfWeekOrder.indexOf(dentistScheduleInDays[dayIndex])

    const currentDate = new Date(date); // Clone the current date
    const startWeekDate = new Date(currentDate);
    const dayOffsetToMonday = (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1); // If today is Sunday, go back 6 days
    startWeekDate.setDate(currentDate.getDate() - dayOffsetToMonday);
  
    // Calculate end of the week (Sunday)
    const endWeekDate = new Date(startWeekDate);
    endWeekDate.setDate(startWeekDate.getDate() + 6); // Add 6 days to the start date to get the Saturday
  

    const generateDates = (start: Date, end: Date) => {
      const dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }
    const weekDates = generateDates(startWeekDate, endWeekDate);


    const selectedDate = weekDates[targetIndex];
    setSelectedDate(selectedDate);
    setDrawerOpen(true);
    const start = `${String(Math.floor(timeIndex / 4) + openingTime).padStart(2, '0')}:${String((timeIndex % 4) * 15).padStart(2, '0')}`
    setMainSheet({
      name: "MainSheet", 
      component: <AddAppointmentForm dentistId={dentists[dentistIndex]._id} start={start}/>
    })
  }

  return (
    <Fragment>
      {Array(weekGridCols).fill(0).map((_, dentistIndex) => {
        const cols = dentists[dentistIndex].dentistSchedule?.length || 0;
        return (
          <article 
            key={dentistIndex} 
            className={` w-full h-full grid grid-flow-col  `}
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            
          >
            {Array(cols).fill(0).map((_, dayIndex) => (
              <section 
                key={`${dentistIndex}-${dayIndex}`}  
                className="w-full h-full"
              >
                {Array((closingTime - openingTime) * 4).fill(0).map((_, timeIndex) => (
                  <div 
                    key={`${dentistIndex}-${timeIndex}`}  
                    className="w-full border-r border-b border-gray-100 h-[30px] hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelect(dentistIndex, timeIndex, dayIndex)}
                  />
                ))}
              </section>

            ))}
          </article>
        );
      })}
    </Fragment>
  )
}

export default WeekGrid
