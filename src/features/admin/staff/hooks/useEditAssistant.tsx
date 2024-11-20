import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditAssistantSchema } from "../schemas/assistant.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAssistant } from "../services/assistant.services";
import { toast } from "sonner";
import { useStaffStore } from "../stores/staff.store";
import { AssistantType } from "../types/assistant.types";
import Toast from "@components/ui/Toast";

const useEditAssistant = () => {

  const queryClient = useQueryClient();
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const setIsLoading = useStaffStore((state) => state.setIsLoading)
  const setStep = useStaffStore((state) => state.setStep)
  const selectedAssistant = useStaffStore((state) => state.selectedAssistant)

  
  const methods = useForm<AssistantType>({
    resolver: zodResolver(EditAssistantSchema),
    mode: "onSubmit",
    defaultValues: {
      assistantId: selectedAssistant._id,
      assistantDateOfBirth: selectedAssistant.assistantDateOfBirth,
      assistantGender: selectedAssistant.assistantGender,
      assistantAvatar: selectedAssistant.assistantAvatar,
      assistantEmploymentType: selectedAssistant.assistantEmploymentType,
      assistantFullName: selectedAssistant.assistantFullName,
      assistantRole: selectedAssistant.assistantRole,
      assistantPhoneNumber: selectedAssistant.assistantCredentialId.credentialPhoneNumber,
      assistantEmail: selectedAssistant.assistantCredentialId.credentialEmail,
      assistantAddress: selectedAssistant.assistantAddress,
      assistantSchedule: selectedAssistant.assistantScheduleId.schedules,
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
      const response = await updateAssistant(formData);
      return response; 
    }, 
    onSuccess: (_, variables) => {
      toast.custom(() => (
        <Toast 
          title={variables.assistantFullName} 
          message="has been updated" 
          subtitle={variables.assistantEmail} 
          status="success" 
        />
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
  };
};

export default useEditAssistant;