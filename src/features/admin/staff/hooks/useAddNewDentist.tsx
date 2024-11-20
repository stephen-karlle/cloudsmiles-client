import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewDentistSchema } from "../schemas/dentist.schema";
import { INewDentist } from "../types/dentists.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewDentist } from "../services/dentist.services";
import { toast } from "sonner";
import { useStaffStore } from "../stores/staff.store";
import Toast from "@components/ui/Toast";

const useAddNewDentist = () => {

  const queryClient = useQueryClient();
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const setIsLoading = useStaffStore((state) => state.setIsLoading)
  const setStep = useStaffStore((state) => state.setStep)
  const methods = useForm<INewDentist>({
    resolver: zodResolver(NewDentistSchema),
    mode: "onSubmit",
    defaultValues: {
      dentistAvatar: null,
      dentistGender: "",
      dentistDateOfBirth: null,
      dentistEmploymentType: "",
      dentistFullName: "",
      dentistSpecialization: "",
      dentistPhoneNumber: "",
      dentistEmail: "",
      dentistAddress: "",
      dentistMedicalServices: [],
      dentistCosmeticServices: [],
      dentistSchedule: [],
    }
  });

  const mutation = useMutation({
    mutationFn: async (newDentist: FormData) => {
      const response = await createNewDentist(newDentist);
      return response; 
    }, 
    onSuccess: (data) => {
      toast.custom(() => (
        <Toast title={data.dentistFullName} message="has been added" subtitle={data.dentistEmail} status="success" />
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
  
  const onSubmit: SubmitHandler<INewDentist> = async (data) => {
    setIsLoading(true)

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

    mutation.mutate(formData);
  };

  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useAddNewDentist;