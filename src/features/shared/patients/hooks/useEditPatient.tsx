import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CurrentPatientSchema } from "../schemas/patient.schema";
import { toast } from "sonner";
import { usePatientStore } from "../stores/patient.store";
import { PatientRequestType } from "../types/patient.types";
import { updatePatient } from "../services/patient.services";
import Toast from "@components/ui/Toast";

const useEditPatient = () => {

  const queryClient = useQueryClient();
  const setPatientDrawerOpen = usePatientStore((state) => state.setPatientDrawerOpen)
  const setIsLoading = usePatientStore((state) => state.setIsLoading)
  const selectedPatient = usePatientStore((state) => state.selectedPatient)

  const methods = useForm<PatientRequestType>({
    resolver: zodResolver(CurrentPatientSchema),
    mode: "onSubmit",
    defaultValues: {
      patientId: selectedPatient._id,
      patientAvatar: selectedPatient.patientAvatar,
      patientFullName: selectedPatient.patientFullName,
      patientPhoneNumber: selectedPatient.patientCredentialId.credentialPhoneNumber,
      patientEmail: selectedPatient.patientCredentialId.credentialEmail,
      patientGender: selectedPatient.patientGender,
      patientAddress:  selectedPatient.patientAddress ,
      patientDateOfBirth: new Date(selectedPatient.patientDateOfBirth),
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: PatientRequestType ) => {
      setIsLoading(true)
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'patientAvatar' && value instanceof File) {
          formData.append('patient_avatar', value);
        } else {
          formData.append(key, value as string);
        }
      })
      const response = await updatePatient(formData);
      return response; 
    }, 
    onSuccess: (_, variable) => {
      toast.custom(() => (
        <Toast title={variable.patientFullName} message="has been updated" subtitle={variable.patientEmail} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      methods.reset();
      setPatientDrawerOpen(false)
      setIsLoading(false)
      queryClient.invalidateQueries({ queryKey: ["patientsTableData"] });
    }
  });
  
  const onSubmit: SubmitHandler<PatientRequestType> = async (data) => {
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useEditPatient;