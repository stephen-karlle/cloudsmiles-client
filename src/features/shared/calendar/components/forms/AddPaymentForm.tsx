import { usePaymentAppointmentStore, useViewAppointmentStore } from "../../stores/appointment.stores"
import { useFormContext } from "react-hook-form"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getTreatmentCost } from "../../services/treatment.services"
import ViewAppointmentForm from "./ViewAppointmentForm"
import PaymentStep from "../steps/create_payment/PaymentStep"
import InformationIcon from "@icons/linear/InformationIcon"

const AddPaymentForm = () => {

  const queryClient = useQueryClient()
  const { setValue } = useFormContext()

  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment)
  
  const setPaymentDrawerOpen = usePaymentAppointmentStore((state) => state.setPaymentDrawerOpen)
  const setTreatmentCosts = usePaymentAppointmentStore((state) => state.setTreatmentCosts)
  
  const setViewMainSheet = useViewAppointmentStore((state) => state.setViewMainSheet)
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen)
  
  const cardStates = usePaymentAppointmentStore((state) => state.cardStates)
  const hasOpenCards = Object.values(cardStates).some((state) => state);
  const closeCards = usePaymentAppointmentStore((state) => state.closeCards)

  const handleClose = () => {
    const delay = hasOpenCards ? 300 : 0;    
    closeCards();
    setTimeout(() => {
      setPaymentDrawerOpen(false);
      setViewMainSheet({ 
        name: "MainSheet1", 
        component: <ViewAppointmentForm />
      })
      setTimeout(() => {
        setViewDrawerOpen(true);
        queryClient.removeQueries({ queryKey: ["paymentTreatmentCost"] });
      }, 280);
    }, delay);
  }

  const { isLoading } = useQuery({
    queryKey:["appointmentTreatmentCost"],
    queryFn: async () => {
      const data = await getTreatmentCost(selectedAppointment?.appointmentData?._id || "")
      setTreatmentCosts(data ? data : null)
      setValue("appointmentId", selectedAppointment?.appointmentData?._id)
      return data
    }
  })

  if(isLoading) return <div>Loading...</div>


  return (
    <article 
      className="flex flex-col w-full h-full"
    >
      <section className="flex flex-col h-full overflow-hidden">
        <PaymentStep handleClose={handleClose} />
      </section>
      <div className="w-full flex items-center justify-center gap-2 bg-white z-20 rounded-b-3xl h-20 p-4 border-t border-gray-200">
        <InformationIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
        <label className="text-gray-500 text-sm">Please select the payment method to complete the appointment</label>
      </div>

    </article>
  )
}

export default AddPaymentForm