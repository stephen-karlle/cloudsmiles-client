import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayAppointmentSchema } from "../schemas/appointment.schema";
import { useMutation } from "@tanstack/react-query";
import { usePaymentAppointmentStore } from "../stores/appointment.stores";
import { PaymentRequestType } from "../types/appointment.types";


const usePayAppointment = () => {

  const setPaymentDrawerOpen = usePaymentAppointmentStore((state) => state.setPaymentDrawerOpen)
  const setIsLoading = usePaymentAppointmentStore((state) => state.setIsLoading)
  
  
  const methods = useForm<PaymentRequestType>({
    resolver: zodResolver(PayAppointmentSchema),
    mode: "onSubmit",
    defaultValues: {
      paymentMethod: "",
      paymentAmount: 0,
      paymentNotes: "",
      paymentType: "",
      paymentStatus: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async ( ) => {
    }, 
    onSettled: () => {
      setPaymentDrawerOpen(false)
      setIsLoading(false)
    }
  });
  

  const onSubmit = async () => {
    // setIsLoading(true)
  }


  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default usePayAppointment;