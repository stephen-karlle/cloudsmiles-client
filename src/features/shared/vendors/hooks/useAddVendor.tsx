import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { VendorRequestType } from "../types/vendor.types";
import { NewVendorSchema } from "../schemas/vendor.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVendor } from "../services/vendor.services";
import { toast } from "sonner";
import { useDrawerStore } from "@stores/drawer.store";
import { createActivity } from "@features/admin/activities/services/activity.services";
import { useUserStore } from "@stores/user.store";
import Toast from "@components/ui/Toast";

const useAddVendor = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const setIsLoading = useDrawerStore((state) => state.setIsLoading);
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);

  const methods = useForm<VendorRequestType>({
    resolver: zodResolver(NewVendorSchema),
    mode: "onSubmit",
    defaultValues: {
      vendorAddress: "",
      vendorCompanyName: "",
      vendorContactPerson: "",
      vendorEmail: "",
      vendorPhoneNumber: "",
    }
  });

  
  const mutation = useMutation({
    mutationFn: async (data: VendorRequestType) => {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'vendorAvatar' && value instanceof File) {
          formData.append('vendor_avatar', value);
        } else {
          formData.append(key, value as string);
        }
      });
      const response = await createVendor(formData);
      return response; 
    }, 
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['vendorTableData']}); 
      toast.custom(() => (
        <Toast title={variables.vendorCompanyName} message="has been created" subtitle={variables.vendorEmail} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      setIsLoading(false);
      setDrawerOpen(false);
      methods.reset()
    }
  });


  const onSubmit: SubmitHandler<VendorRequestType> = async (data) => {
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Vendor details for ${data.vendorCompanyName} has been added.`,
        activityAction: "Create",
      })
    }
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit
  };
};

export default useAddVendor;
