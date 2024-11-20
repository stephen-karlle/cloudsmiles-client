import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "@stores/user.store"
import { getDentist } from "../../services/calendar.store"
import { useDrawerStore } from "@stores/drawer.store"
import SchedulerHeader from "../scheduler/SchedulerHeader"
import SchedulerGrid from "../scheduler/SchedulerGrid"
import Drawer from "@components/ui/Drawer"
import ViewAppointmentForm from "../forms/ViewAppointmentForm"

const CalendarOutlet = () => {

  const user = useUserStore((state) => state.user)
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen)

  const { data: dentist, isLoading } = useQuery({
    queryKey: ["dentistData", user._id],
    queryFn: () => getDentist(user._id),
  })
  
  if (isLoading) return <div>Loading...</div>


  const schedules = dentist.dentistScheduleId.schedules
  

  return (
    <article
      className="w-full h-full flex flex-col items-start"
    >
      <Drawer 
        mainSheet={{
          name: "MainSheet",
          component: <ViewAppointmentForm />,
        }}
        isOpen={isDrawerOpen}
        activeSheets={[]}
      />
      <SchedulerHeader 
        appointmentCount={4}
      />
      <section className="overflow-scroll flex w-full h-full">
        <SchedulerGrid schedules={schedules} />
      </section>
    </article>
  )
}

export default CalendarOutlet