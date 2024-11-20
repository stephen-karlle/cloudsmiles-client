import { useDrawerStore } from "@stores/drawer.store"
import { usePatientStore } from "../stores/patient.store"
import Drawer from "@components/ui/Drawer"
import SchedulerGrid from "./scheduler/SchedulerGrid"
import SchedulerHeader from "./scheduler/SchedulerHeader"
import ViewAppointmentForm from "./forms/ViewAppointmentForm"
import FinishAppointmentForm from "./forms/FinishAppointmentForm"
import RateAppointmentForm from "./forms/RateAppointmentForm"

const PatientCalendarOutlet = () => {

  const selectedAppointment = usePatientStore((state) => state.selectedAppointment)
  const date = usePatientStore((state) => state.date)
  const setDate = usePatientStore((state) => state.setDate)
  const appointments = usePatientStore((state) => state.appointments)
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen)
  const isExtraDrawerOpen = useDrawerStore((state) => state.isExtraDrawerOpen)
  const isFinished = selectedAppointment.appointmentData.appointmentStatus === "Finished"


  return (
    <article
      className="w-full h-full flex flex-col items-start"
    >
      <Drawer
        isOpen={isDrawerOpen}
        activeSheets={[]}
        mainSheet={{
          name: "MainSheet1",
          component: isFinished ? <FinishAppointmentForm /> : <ViewAppointmentForm />,
        }}
      />
      <Drawer
        isOpen={isExtraDrawerOpen}
        activeSheets={[]}
        mainSheet={{
          name: "MainSheet1",
          component: <RateAppointmentForm />,
        }}
      />
      <SchedulerHeader 
        date={date}
        setDate={setDate}
        appointmentCount={appointments.length}
      />
      <section className="overflow-scroll flex w-full h-full">
        <SchedulerGrid />
      </section>
    </article>
  )
}

export default PatientCalendarOutlet