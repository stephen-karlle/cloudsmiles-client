import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { calculateNumberOfDentistAppointments, generateDayGridCol } from "../../../utils/calendar.utils"; 
import { useDayDentist } from '@features/shared/calendar/services/state/useDayDentist';
import Avatar from '@components/ui/Avatar';


const DaySubHeader = () => {

  const { data: dentists, isLoading, isError } = useDayDentist()
  const appointments = useCalendarStore((state) => state.appointments);

  const date = useCalendarStore((state) => state.date);
  const gridColWidth = useCalendarStore((state) => state.gridColWidth);
  const gridColsStyle = generateDayGridCol(dentists, gridColWidth)


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>



  return (
    <article className="grid sticky top-0 z-40 w-full  bg-white " style={{gridTemplateColumns: gridColsStyle}}>
      <div className="flex flex-col items-center justify-center h-20 border-r border-b border-gray-20 sticky top-0 left-0 z-50 w-[96px] bg-white">
        <p className="text-base font-medium text-gray-700">GMT</p>
        <p className="text-sm text-gray-500">+08:00</p>
      </div>
      {dentists?.map((dentist, index) => {
        const appointmentCount = calculateNumberOfDentistAppointments(dentist, appointments, date) 
        return (
          <div className="h-20 flex items-center justify-start p-6 border-r border-b border-gray-200 gap-2 bg-white" key={index}>
            <Avatar 
              name={dentist.dentistFullName}
              src={dentist.dentistAvatar}
              size="md"
            />
            <div className="flex flex-col">
              <p className="text-base text-gray-700 font-medium">{"Dr. " + dentist.dentistFullName}</p> 
              <p className="text-sm text-gray-500 font-normal">{"Total appointment: "}
                <span className="text-gray-700 font-medium">{appointmentCount + ` patient${appointmentCount > 1 ? "s" : ""}`}</span>
              </p> 
            </div>
          </div>
        )
      })}
    </article>
  )
}

export default DaySubHeader