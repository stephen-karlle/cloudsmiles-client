import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProductSchema, } from "../schemas/product.schema"; 
import { ProductRequestType } from "../types/product.types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { editProduct, validateSku } from "../services/product.services";
import { useDrawerStore } from "@stores/drawer.store";
import { useStocksStore } from "../stores/stocks.store";
import { createActivity } from "@features/admin/activities/services/activity.services";
import { useUserStore } from "@stores/user.store";
import Toast from "@components/ui/Toast";

const useEditProduct = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const selectedProduct = useStocksStore((state) => state.selectedProduct);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const setIsLoading = useStocksStore((state) => state.setIsLoading)

  const methods = useForm<ProductRequestType>({
    resolver: zodResolver(EditProductSchema),
    mode: "onSubmit",
    defaultValues:{
      _id: selectedProduct._id,
      productName: selectedProduct.productName,
      productSku: selectedProduct.productSku,
      productDescription: selectedProduct.productDescription,
      productCategory: selectedProduct.productCategory,
      productUnitPrice: selectedProduct.productUnitPrice,
      productQuantity: selectedProduct.productQuantity,
      productAvatar: selectedProduct.productAvatar,
      vendorId: selectedProduct.vendorId._id,
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductRequestType) => {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'productAvatar' && value instanceof File) {
          formData.append('product_avatar', value);
        } else {
          formData.append(key, value as string);
        }
      });
      const response = await editProduct(formData);
      return response; 
    }, 
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['stocksHeaderData']}); 
      queryClient.invalidateQueries({queryKey: ['productTableData']}); 
      toast.custom(() => (
        <Toast title={variables.productName} message="has been updated" subtitle={variables.productSku} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      setIsLoading(false);
      closeDrawer();
      methods.reset()
    }
  });



  const onSubmit: SubmitHandler<ProductRequestType> = async (data) => { 
    const isSkuValid = await validateSku(data.productSku);
    if (!isSkuValid && selectedProduct.productSku !== data.productSku) {
      methods.setError('productSku', {
        type: 'manual',
        message: 'SKU already exists'
      });
      return;
    }

    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Product detials for ${data.productName} has been edited.`,
        activityAction: "uPDATE",
      })
    }

    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit
  };
};

export default useEditProduct;
