import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { VendorRequestType } from "../types/vendor.types";
import { EditVendorSchema } from "../schemas/vendor.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVendor } from "../services/vendor.services";
import { toast } from "sonner";
import { useDrawerStore } from "@stores/drawer.store";
import { useVendorStore } from "../stores/vendor.store";
import Toast from "@components/ui/Toast";

const useEditVendor = () => {

  const queryClient = useQueryClient();
  const selectedVendor = useVendorStore((state) => state.selectedVendor);
  const setIsLoading = useDrawerStore((state) => state.setIsLoading);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  

  const methods = useForm<VendorRequestType>({
    resolver: zodResolver(EditVendorSchema),
    mode: "onSubmit",
    defaultValues: {
      _id: selectedVendor._id,
      vendorAvatar: selectedVendor.vendorAvatar,
      vendorType: selectedVendor.vendorType,
      vendorAddress: selectedVendor.vendorAddress,
      vendorCompanyName: selectedVendor.vendorCompanyName,
      vendorContactPerson: selectedVendor.vendorContactPerson,
      vendorEmail: selectedVendor.vendorEmail,
      vendorPhoneNumber: selectedVendor.vendorPhoneNumber,
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
      const response = await editVendor(formData);
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
      closeDrawer();
      methods.reset()
    }
  });


  const onSubmit: SubmitHandler<VendorRequestType> = async (data) => {
    mutation.mutate(data);
    console.log(data);
  };

  return {
    ...methods,
    onSubmit
  };
};

export default useEditVendor;