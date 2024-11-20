import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTreatmentSchema } from "../schemas/treatment.schema"; 
import { TreatmentRequestType } from "../types/treatment.types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTreatment } from "../services/treatment.services";
import { useDrawerStore } from "@stores/drawer.store";
import Toast from "@components/ui/Toast";


const useAddNewTreatment = () => {
  const queryClient = useQueryClient();
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);
  const setIsLoading = useDrawerStore((state) => state.setIsLoading);
  const methods = useForm<TreatmentRequestType>({
    resolver: zodResolver(NewTreatmentSchema),
    mode: "onSubmit",
    defaultValues: {
      treatmentName: "",
      treatmentCategory:"",
      treatmentDescription: "",
      treatmentChargeType: "",
      treatmentCost: 0,
      treatmentDuration: "",
      treatmentComponents: [],
      treatmentMedicines: [],
    }
  });

  const mutation = useMutation({
    mutationFn: async (newTreatment: TreatmentRequestType) => {
      setIsLoading(true);
      const response = await createTreatment(newTreatment);
      return response; 
    }, 
    onSuccess: (data) => {
      toast.custom(() => (
        <Toast title={data.treatmentName} message="has been added" subtitle={data.treatmentCategory} status="success" />
      ), { duration: 5000 });
      queryClient.invalidateQueries({ queryKey: ['treatmentTableData'] });
    },
    onSettled: () => {
      setDrawerOpen(false);
      setIsLoading(false);
      methods.reset();
    }
  });

  const onSubmit: SubmitHandler<TreatmentRequestType> = async (newTreatment: TreatmentRequestType) => {
    mutation.mutate(newTreatment);
    console.log(newTreatment);
  };

  return {
    ...methods, 
    onSubmit,
  };
};

export default useAddNewTreatment;