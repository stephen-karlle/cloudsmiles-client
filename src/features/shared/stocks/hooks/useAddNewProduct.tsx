import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewProductSchema } from "../schemas/product.schema"; 
import { ProductRequestType } from "../types/product.types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createProduct, validateSku } from "../services/product.services";
import { useDrawerStore } from "@stores/drawer.store";
import { useStocksStore } from "../stores/stocks.store";
import Toast from "@components/ui/Toast";

const useAddNewProduct = () => {

  const queryClient = useQueryClient();
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);
  const setIsLoading = useStocksStore((state) => state.setIsLoading)

  const methods = useForm<ProductRequestType>({
    resolver: zodResolver(NewProductSchema),
    mode: "onSubmit",
    defaultValues: {
      productName: '',
      productSku: '',
      productDescription: '',
      productCategory: '',
      productUnitPrice: 0,
      productAvatar: '',
      vendorId: '',
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
      const response = await createProduct(formData);
      return response; 
    }, 
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['stocksHeaderData']}); 
      queryClient.invalidateQueries({queryKey: ['productTableData']}); 
      toast.custom(() => (
        <Toast title={variables.productName} message="has been added" subtitle={variables.productSku} status="success" />
      ), { duration: 5000 });
    },
    onSettled: () => {
      setIsLoading(false);
      setDrawerOpen(false);
      methods.reset()
    }
  });



  const onSubmit: SubmitHandler<ProductRequestType> = async (data) => {
    
    const isSkuValid = await validateSku(data.productSku);
    if (!isSkuValid) {
      methods.setError('productSku', {
        type: 'manual',
        message: 'SKU already exists'
      });
      return;
    }

    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit
  };
};

export default useAddNewProduct;