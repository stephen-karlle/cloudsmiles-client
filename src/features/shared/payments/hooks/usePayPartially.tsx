import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaymentRequestType } from "@features/shared/calendar/types/appointment.types";
import { PayPartiallySchema } from "../schemas/payment.schema";
import { usePaymentStore } from "../stores/payment.store";
import { toast } from "sonner";
import { useUserStore } from "@stores/user.store";
import { partiallyPayWithCash } from "../services/payment.services";
import Toast from "@components/ui/Toast";
import { createActivity } from "@features/admin/activities/services/activity.services";


const usePayPartially = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient()
  const selectedPayment = usePaymentStore((state) => state.selectedPayment)
  const totalCost = selectedPayment.paymentTotalCost
  const appointment = selectedPayment.paymentAppointmentId
  const patient = selectedPayment.paymentAppointmentId.appointmentPatientId
  const closeDrawer = usePaymentStore((state) => state.closeDrawer)
  const closeCards = usePaymentStore((state) => state.closeCards)
  const setIsLoading = usePaymentStore((state) => state.setIsLoading)

  
  const methods = useForm<PaymentRequestType>({
    resolver: zodResolver(PayPartiallySchema),
    mode: "onSubmit",
    defaultValues: {
      appointmentId: appointment._id,
      paymentMethod: "",
      paymentAmount: 0,
      paymentNotes: "",
      paymentStatus: "partial",
      paymentType: "Installment",
      paymentTotalCost: totalCost,
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: PaymentRequestType) => {
      const response = await partiallyPayWithCash(data);
      console.log(response);
      return response; 
    }, 
    onSuccess: () => {
      toast.custom(() => (
        <Toast title={patient.patientFullName} message="has been paid successfully" subtitle={appointment.appointmentSerialId} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      closeDrawer()
      setIsLoading(false)
      queryClient.invalidateQueries({queryKey: ["paymentTableData"]})
    }
  });
  
  const onSubmit = async (data: PaymentRequestType) => {
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Payment for Appointment-${selectedPayment.paymentAppointmentId.appointmentSerialId} has been updated.`,
        activityAction: "Create",
      })
    }

    closeCards()
    const historyBalance = selectedPayment.paymentHistory.map((history) => history.paymentAmount).reduce((acc, cost) => acc + cost, 0)
    const totalCost = selectedPayment.paymentTotalCost
    const balance = historyBalance + selectedPayment.paymentAmount
    const amountDue = totalCost - balance
    
    if(Number(data.paymentAmount) >= Number(amountDue)){
      data.paymentStatus = "paid"
    } else{
      data.paymentStatus = "partial"
    }
    setIsLoading(true)

    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default usePayPartially;
