import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewPatientSchema } from "../schemas/patient.schema";
import { toast } from "sonner";
import { usePatientStore } from "../stores/patient.store";
import { PatientRequestType } from "../types/patient.types";
import Toast from "@components/ui/Toast";
import { createPatient } from "../services/patient.services";

const useAddPatient = () => {

  const queryClient = useQueryClient();
  const setPatientDrawerOpen = usePatientStore((state) => state.setPatientDrawerOpen)
  const setIsLoading = usePatientStore((state) => state.setIsLoading)

  const methods = useForm<PatientRequestType>({
    resolver: zodResolver(NewPatientSchema),
    mode: "onSubmit",
    defaultValues: {
      patientAvatar: null,
      patientFullName: "",
      patientPhoneNumber: "",
      patientEmail: "",
      patientGender: "",
      patientAddress: "",
      patientDateOfBirth: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData ) => {
      const response = await createPatient(data);
      return response; 
    }, 
    onSuccess: () => {
      toast.custom(() => (
        <Toast title={methods.getValues("patientFullName")} message="has been added" subtitle={methods.getValues("patientEmail")} status="success" />
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
    setIsLoading(true)
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'patientAvatar' && value instanceof File) {
        formData.append('patient_avatar', value);
      } else {
        formData.append(key, value as string);
      }
    });

    mutation.mutate(formData);
  };

  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useAddPatient;