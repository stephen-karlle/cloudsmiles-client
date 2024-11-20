import { useAdminStore } from "src/stores/admin/admin.store";
import { FormProvider } from "react-hook-form";
import { useCalendarStore } from "../../stores/calendar.stores";
import AppointmentDetailsStep from "../steps/create_appointment/AppointmentDetailsStep";
import DrawerFooter from "@components/shared/DrawerFooter";
import DrawerHeader from "@components/shared/DrawerHeader";
import useAddNewAppointment from "../../hooks/useAddNewAppointment";

export type AddAppointmentFormType = {
  dentistId: string;
  start: string;
}

const AddAppointmentForm = ({
  dentistId,
  start
}: AddAppointmentFormType) => {
  const activeView = useCalendarStore((state) => state.activeView);
  const dayDate = useCalendarStore((state) => state.date);
  const weekDate = useCalendarStore((state) => state.selectedDate);
  const date = activeView === "Day" ? dayDate : weekDate;
  const methods = useAddNewAppointment(dentistId, date, start);
  const { reset, handleSubmit, onSubmit } = methods;
  const setDrawerOpen = useAdminStore((state) => state.setDrawerOpen)
  const isLoading = useAdminStore((state) => state.isLoading)



  const handleClose = () => {
    setDrawerOpen(false)
    reset()
  }


  return(
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col w-full h-full"
      >
        <DrawerHeader 
          title="Add New Appointment"
          handleClose={handleClose}
        />
        <AppointmentDetailsStep /> 
        <DrawerFooter 
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          step={1}
          setStep={() => {}}
          isLoading={isLoading}
          isFinal={true}
        />
      </form>
    </FormProvider>
  )
}

export default AddAppointmentForm