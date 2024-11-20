import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditDentistSchema } from "../schemas/dentist.schema";
import { ICurrentDentist } from "../types/dentists.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDentist } from "../services/dentist.services";
import { toast } from "sonner";
import { useStaffStore } from "../stores/staff.store";
import Toast from "@components/ui/Toast";

const useEditDentist = () => {

  const queryClient = useQueryClient();
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const setIsLoading = useStaffStore((state) => state.setIsLoading)
  const setStep = useStaffStore((state) => state.setStep)
  const selectedDenstist = useStaffStore((state) => state.selectedDentist)

  
  const methods = useForm<ICurrentDentist>({
    resolver: zodResolver(EditDentistSchema),
    mode: "onSubmit",
    defaultValues: {
      dentistId: selectedDenstist._id,
      dentistAvatar: selectedDenstist.dentistAvatar,
      dentistEmploymentType: selectedDenstist.dentistEmploymentType,
      dentistFullName: selectedDenstist.dentistFullName,
      dentistGender: selectedDenstist.dentistGender,
      dentistDateOfBirth: selectedDenstist.dentistDateOfBirth,
      dentistSpecialization: selectedDenstist.dentistSpecialization,
      dentistPhoneNumber: selectedDenstist.dentistCredentialId.credentialPhoneNumber,
      dentistEmail: selectedDenstist.dentistCredentialId.credentialEmail,
      dentistAddress: selectedDenstist.dentistAddress,
      dentistMedicalServices: selectedDenstist.dentistMedicalServices,
      dentistCosmeticServices: selectedDenstist.dentistCosmeticServices,
      dentistSchedule: selectedDenstist.dentistScheduleId.schedules,
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ICurrentDentist) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'dentistAvatar' && value instanceof File) {
          formData.append('dentist_avatar', value);
        } else if ((key === 'dentistSchedule') && Array.isArray(value)) {
          formData.append('dentistSchedule', JSON.stringify(value));
        } else if ( key === "dentistMedicalServices"){
          formData.append('dentistMedicalServices', JSON.stringify(value));
        } else if ( key === "dentistCosmeticServices"){
          formData.append('dentistCosmeticServices', JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
      const response = await updateDentist(formData);
      return response; 
    }, 
    onSuccess: (_, variables) => {
      toast.custom(() => (
        <Toast 
          title={variables.dentistFullName} 
          message="has been updated" 
          subtitle={variables.dentistEmail} 
          status="success" 
        />
      ), { duration: 5000 });
      queryClient.invalidateQueries({ queryKey: ["dentistsTableData"] });
    },
    onSettled: () => {
      methods.reset();
      setStaffDrawerOpen(false)
      setIsLoading(false)
      setStep(1)
    }
  });
  
  const onSubmit: SubmitHandler<ICurrentDentist> = async (data) => {
    setIsLoading(true)
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useEditDentist;