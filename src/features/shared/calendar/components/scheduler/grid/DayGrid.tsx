import { Fragment } from "react/jsx-runtime";
import { useCalendarStore } from "../../../stores/calendar.stores";
import { useAdminStore } from "src/stores/admin/admin.store";
import { useNewAppointmentStore } from "../../../stores/appointment.stores";
import { useDayDentist } from "../../../services/state/useDayDentist";
import AddAppointmentForm from "../../forms/AddAppointmentForm";


interface ICalendarGrid {
  dayGridCols: number;
}


const DayGrid = ({ dayGridCols }: ICalendarGrid ) => {
  const { data: dentists } = useDayDentist()
  
  const openingTime = useCalendarStore((state) => state.openingTime);
  const closingTime = useCalendarStore((state) => state.closingTime);

  
  const setDrawerOpen = useAdminStore((state) => state.setDrawerOpen);
  const setMainSheet = useAdminStore((state) => state.setMainSheet);

  const setSelectedDentist = useNewAppointmentStore((state) => state.setSelectedDentist);
  const setSelectedTimeIndex = useNewAppointmentStore((state) => state.setSelectedTimeIndex);

  
  const handleOpenDrawer = ( index: number, subIndex: number) => {
    if (!dentists) return;
    setSelectedDentist(dentists[index])
    setSelectedTimeIndex(subIndex)
    setDrawerOpen(true);
    const start = `${String(Math.floor(subIndex / 4) + openingTime).padStart(2, '0')}:${String((subIndex % 4) * 15).padStart(2, '0')}`  
    setMainSheet({
      name: "MainSheet", 
      component: <AddAppointmentForm dentistId={dentists[index]._id} start={start}/>
    })
  }


  
  return (
    <Fragment>
      {Array(dayGridCols).fill(0).map((_, index) => {
        return (
          <section key={index} className=" h-full ">
            {Array((closingTime - openingTime) * 4).fill(0).map((_, subIndex) => (
              <div 
                key={`${index}-${subIndex}`}  
                className="w-full border-r border-b border-gray-100 h-[30px] hover:bg-gray-50 cursor-pointer "
                onClick={() => handleOpenDrawer(index, subIndex)}
              />
            ))}
          </section>
        );
      })}
    </Fragment>
  )
}

export default DayGrid
