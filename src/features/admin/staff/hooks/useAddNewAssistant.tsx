import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewAssistantSchema } from "../schemas/assistant.schema";
import { createNewAssistant } from "../services/assistant.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssistantType } from "../types/assistant.types";
import { useStaffStore } from "../stores/staff.store";
import Toast from "@components/ui/Toast";

const useAddNewAssistant = () => {

  const queryClient = useQueryClient();
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const setIsLoading = useStaffStore((state) => state.setIsLoading)
  const setStep = useStaffStore((state) => state.setStep)
  const methods = useForm<AssistantType>({
    resolver: zodResolver(NewAssistantSchema),
    mode: "onSubmit",
    defaultValues: {
      assistantAvatar: null,
      assistantGender: "",
      assistantDateOfBirth: null,
      assistantEmploymentType: "",
      assistantFullName: "",
      assistantPhoneNumber: "",
      assistantEmail: "",
      assistantAddress: "",
      assistantSchedule: [],
      assistantRole: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: AssistantType) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'assistantAvatar' && value instanceof File) {
          formData.append('assistant_avatar', value);
        } else if ((key === 'assistantSchedule') && Array.isArray(value)) {
          formData.append('assistantSchedule', JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
    
      const response = await createNewAssistant(formData);
      return response; 
    }, 
    onSuccess: (_, variables) => {
      toast.custom(() => (
        <Toast title={variables.assistantFullName} message="has been added" subtitle={variables.assistantEmail} status="success" />
      ), { duration: 5000 });
      queryClient.invalidateQueries({ queryKey: ["assistantsTableData"] });
    },
    onSettled: () => {
      methods.reset();
      setStaffDrawerOpen(false)
      setIsLoading(false)
      setStep(1)
    }
  });
  
  const onSubmit: SubmitHandler<AssistantType> = async (data) => {
    setIsLoading(true)
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useAddNewAssistant;