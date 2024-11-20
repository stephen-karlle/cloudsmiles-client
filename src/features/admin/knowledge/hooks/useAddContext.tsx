import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContextRequestType } from "../types/context.types";
import { ContextSchema } from "../schemas/context.schema";
import { ingestContext } from "../services/knowledge.services";
import { toast } from "sonner";
import { useKnowledgeStore } from "../stores/knowledge.store";
import Toast from "@components/ui/Toast";

const useAddContext = () => {

  const queryClient = useQueryClient();
  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen)
  const setIsLoading = useKnowledgeStore((state) => state.setIsLoading)

  const methods = useForm<ContextRequestType>({
    resolver: zodResolver(ContextSchema),
    mode: "onSubmit",
    defaultValues: {
      contextType: "question",
      contextCategory: "",
      contextData: "",
      contextLabel: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ContextRequestType) => {
      const response = await ingestContext(data);
      console.log(response)
      return response; 
    }, 
    onSuccess: (data) => {
      toast.custom(() => (
        <Toast title={data.contextLabel} message="has been added" subtitle={data.contextCategory} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      methods.reset();
      setKnowledgeDrawerOpen(false)
      setIsLoading(false)
      queryClient.invalidateQueries({ queryKey: ["contextTableData"] });
    }
  });
  
  const onSubmit: SubmitHandler<ContextRequestType> = async (data) => {
    setIsLoading(true)
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
    isLoading: mutation.isPending,  
  };
};

export default useAddContext;