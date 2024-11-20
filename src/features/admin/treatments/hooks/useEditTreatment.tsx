import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTreatmentSchema } from "../schemas/treatment.schema"; 
import { TreatmentRequestType } from "../types/treatment.types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTreatment } from "../services/treatment.services";
import { useDrawerStore } from "@stores/drawer.store";
import { useTreatmentStore } from "../stores/treatment.store";
import { useEffect } from "react";
import Toast from "@components/ui/Toast";


const useEditTreatment = () => {
  const queryClient = useQueryClient();
  const selectedTreatment = useTreatmentStore((state) => state.selectedTreatment);
  const setDrawerOpen = useTreatmentStore((state) => state.setTreatmentDrawerOpen);
  const setIsLoading = useDrawerStore((state) => state.setIsLoading);
  


  const methods = useForm<TreatmentRequestType>({
    resolver: zodResolver(EditTreatmentSchema),
    mode: "onSubmit",
    defaultValues: {
      _id: selectedTreatment._id,
      treatmentName: selectedTreatment.treatmentName,
      treatmentCategory: selectedTreatment.treatmentCategory,
      treatmentDescription: selectedTreatment.treatmentDescription,
      treatmentChargeType: selectedTreatment.treatmentChargeType,
      treatmentCost: selectedTreatment.treatmentCost,
      treatmentDuration: selectedTreatment.treatmentDuration,
      treatmentComponents: selectedTreatment.treatmentComponents,
      treatmentMedicines: selectedTreatment.treatmentMedicines,
    }
  });


  const mutation = useMutation({
    mutationFn: async (newTreatment: TreatmentRequestType) => {
      setIsLoading(true);
      const response = await editTreatment(newTreatment);
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

  useEffect(() => {
    if (selectedTreatment) {
      methods.reset({
        _id: selectedTreatment._id,
        treatmentName: selectedTreatment.treatmentName,
        treatmentCategory: selectedTreatment.treatmentCategory,
        treatmentDescription: selectedTreatment.treatmentDescription,
        treatmentChargeType: selectedTreatment.treatmentChargeType,
        treatmentCost: selectedTreatment.treatmentCost,
        treatmentDuration: selectedTreatment.treatmentDuration,
        treatmentComponents: selectedTreatment.treatmentComponents,
        treatmentMedicines: selectedTreatment.treatmentMedicines,
      });
    }
  }, [selectedTreatment, methods]);

  const onSubmit: SubmitHandler<TreatmentRequestType> = async (newTreatment: TreatmentRequestType) => {
    mutation.mutate(newTreatment);
    console.log(newTreatment);
  };

  return {
    ...methods, 
    onSubmit,
  };
};

export default useEditTreatment;