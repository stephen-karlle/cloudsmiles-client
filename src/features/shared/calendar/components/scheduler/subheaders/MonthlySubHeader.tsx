import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { generateDentistWeeklySchedule, generateMonthGridCol } from "../../../utils/calendar.utils"; 
import { isToday } from '@utils/date.utils';
import { useMonthlyDentist } from '@features/shared/calendar/services/state/useMonthlyDentist';
import Avatar from '@components/ui/Avatar';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MonthlySubHeader = () => {

  const { data: dentists, isLoading, isError } = useMonthlyDentist()
  const date = useCalendarStore((state) => state.date)
  const gridColsStyle = generateMonthGridCol(dentists, 250)
  const appointments = useCalendarStore((state) => state.appointments)


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  if (!dentists) return <p>No dentist found</p>



  return (
    <header className="  sticky top-0 z-40 flex flex-col">
      <article className="grid w-full bg-white " style={{gridTemplateColumns: gridColsStyle}}>
        {dentists?.map((dentist, index) => {
          const appointmentCount = appointments?.filter(appointment => appointment.dentistData._id === dentist._id).length ?? 0
          const isAvailableToday = dentist.dentistSchedule?.some((schedule) => {
            const dayIndex = new Date().getDay();
            const dayString = daysOfWeek[dayIndex]
            return schedule.day === dayString;
          }) ?? false;          

          return (
            <div className="h-20 flex items-center  justify-start p-6 border-r border-b border-gray-200 gap-2 bg-white" key={index}>
              <Avatar 
                name={dentist.dentistFullName}
                src={dentist.dentistAvatar}
                size="md"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-base text-gray-700 font-medium">{"Dr. " + dentist.dentistFullName}</p> 
                  {isAvailableToday ? (
                    <div className="flex items-center  gap-1">
                      <span className=" bg-green-500 w-2 h-2 rounded-full" />
                      <span className="text-sm text-green-500 ">Available</span>
                    </div>
                  ):(
                    <span className="text-sm text-gray-500">Not Available</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 font-normal">{"Total appointment: "}
                  <span className="text-gray-700 font-medium">{appointmentCount + ` patient${appointmentCount > 1 ? "s" : ""}`}</span>
                </p> 
              </div>
            </div>
          )
        })}
      </article>
      <article className="w-full bg-white grid  "style={{gridTemplateColumns: gridColsStyle}}>
        {dentists?.map(( dentist, index) => {
          const dates = generateDentistWeeklySchedule(date, dentist.dentistSchedule)
          const gridColStyle = `repeat(${dates.length}, 250px)`;
          return(
            <div 
              style={{gridTemplateColumns: gridColStyle }}
              className="h-12 grid grid-flow-col border-r border-b border-gray-200  bg-white" 
              key={index}
            >
              {dates.map((date, index) => {
                const today = isToday(date)
                return (
                  <div key={index} 
                    className={`
                      w-full h-full border-r border-gray-200 flex items-center justify-center
                    `}
                  >
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
                  </div>
                )}
                )
              }
            </div>
          )
        })}

      </article>
    </header>

  )
}

export default MonthlySubHeader