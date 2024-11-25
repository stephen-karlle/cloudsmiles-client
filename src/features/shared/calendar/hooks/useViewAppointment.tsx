import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ViewAppointmentSchema } from "../schemas/appointment.schema";
import {  DentalCheckupRequestType } from "../types/appointment.types";
import { useMutation } from "@tanstack/react-query";
import { updateAppointmentCheckup } from "../services/calendar.services";
import { useViewAppointmentStore } from "../stores/appointment.stores";
import { useUserStore } from "@stores/user.store";
import { createActivity } from "@features/admin/activities/services/activity.services";


const useViewAppointment = () => {
  const user = useUserStore((state) => state.user)
  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets)
  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment)
  const setIsLoading = useViewAppointmentStore((state) => state.setIsLoading)
  
  const methods = useForm<DentalCheckupRequestType>({
    resolver: zodResolver(ViewAppointmentSchema),
    mode: "onSubmit",
    defaultValues: {
      checkupAppointmentId: "",
      checkupPatientId: selectedAppointment?.patientData?._id,
      checkupData: {
        toothCheckup: [],
        sectionCheckup: [],
        generalCheckup: [],
      },
      agreementDocuments: [],
    }
  });

  const mutation = useMutation({
    mutationFn: async ( data : FormData) => {
      const response = await updateAppointmentCheckup(data);
      console.log(response);
      return response; 
    }, 
    // onSuccess: (data, variables) => {
    //   toast.custom(() => (
    //     <Toast title={data.dentistFullName} message="has been added" subtitle={data.dentistEmail} status="success" />
    //   ), { duration: 5000 });
    // },
    onSettled: () => {
      setViewActiveSheets((prev) => prev.filter(sheet => sheet.name !== "ExtraSheet1"))
      setIsLoading(false)
    }
  });
  
  const onSubmit: SubmitHandler<DentalCheckupRequestType> = async (data) => {
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Dental checkup for ${selectedAppointment.patientData.patientFullName} has been edited.`,
        activityAction: "Update",
      })
    }

    setIsLoading(true)
    const formData = new FormData();
    let uploadedDocuments: { _id: string}[] = [];
    if (data.agreementDocuments) {
      data.agreementDocuments.map((fileWrapper: any ) => {
        if (fileWrapper.file instanceof File) {
          const file = fileWrapper.file;
          formData.append(file.name, file);
        }else{
          uploadedDocuments.push({
            _id: fileWrapper._id,
          });
        }
      });
    }


  
    const checkupData = {
      toothCheckup: data.checkupData.toothCheckup ? JSON.stringify(data.checkupData.toothCheckup) : undefined,
      sectionCheckup: data.checkupData.sectionCheckup ? JSON.stringify(data.checkupData.sectionCheckup) : undefined,
      generalCheckup: data.checkupData.generalCheckup ? data.checkupData.generalCheckup : undefined,
    };
  
    formData.append('checkupPatientId', data.checkupPatientId);
    formData.append('checkupAppointmentId', data.checkupAppointmentId);
    formData.append('checkupData', JSON.stringify(checkupData));
    formData.append('agreementDocuments', JSON.stringify(uploadedDocuments));
  
    mutation.mutate(formData);
  };

  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useViewAppointment;
