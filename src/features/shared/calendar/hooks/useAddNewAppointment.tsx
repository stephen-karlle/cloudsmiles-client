import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewAppointmentSchema } from "../schemas/appointment.schema";
import { IAppointmentRequest, IAppointmentResponse } from "../types/appointment.types";
import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../services/calendar.services";
import { useCalendarStore } from "../stores/calendar.stores";
import { toast } from "sonner";
import { useAdminStore } from "@stores/admin/admin.store";
import { convertDateToISOString } from "@utils/date.utils";
import Toast from "@components/ui/Toast";
import { useUserStore } from "@stores/user.store";
import { createActivity } from "@features/admin/activities/services/activity.services";



const useAddNewAppointment = (
  dentistId: string,
  date: Date,
  start: string
) => {

  const user = useUserStore((state) => state.user);

  const updateAppointments = useCalendarStore((state) => state.updateAppointments);
  const setDrawerOpen = useAdminStore((state) => state.setDrawerOpen);
  const setStep = useAdminStore((state) => state.setStep)
  const setIsLoading = useAdminStore((state) => state.setIsLoading);


  const methods = useForm<IAppointmentRequest>({
    resolver: zodResolver(NewAppointmentSchema),
    mode: "onSubmit",
    defaultValues: {
      appointmentData: {
        appointmentReasonForVisit: "",
        appointmentDate: convertDateToISOString(date),
        appointmentTime: {
          start: start,
          end: null,
        }
      },
      dentistData: {
        _id: dentistId,
      },
      patientData: {
        patientFullName: "",
        patientDateOfBirth: null,
        patientGender: "",
        patientEmail: "",
        patientPhoneNumber: "",
        patientAddress: ""
      },
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: IAppointmentRequest) => {
      const response = await createAppointment(data) as IAppointmentResponse;
      return response; 
    }, 
    onSuccess: (response) => {
      if (!response) return;
      updateAppointments((prevAppointments) => [...prevAppointments, response]);
      toast.custom(() => (
        <Toast title={response.patientData.patientFullName} message="has been added" subtitle={response.appointmentData.appointmentSerialId} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      methods.reset();
      setDrawerOpen(false);
      setIsLoading(false);
      setStep(1)
    }
  });
  
  const onSubmit: SubmitHandler<IAppointmentRequest> = async (data) => {
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Appointment for ${data.patientData.patientFullName} has been added.`,
        activityAction: "Create",
      })
    }

    setIsLoading(true);
    mutation.mutate(data);
  };

  return {

    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useAddNewAppointment;
