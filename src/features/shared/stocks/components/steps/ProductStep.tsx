import { validateSku } from '@features/shared/stocks/services/product.services';
import { useCallback } from 'react';
import { debounce } from '@utils/debounce';
import { Controller, useFormContext } from 'react-hook-form';
import { VendorResponseType } from '@features/shared/vendors/types/vendor.types';
import { getVendors } from '@features/shared/vendors/services/vendor.services';
import { useQuery } from '@tanstack/react-query';
import Input from '@components/ui/Input';
import TextArea from '@components/ui/TextArea';
import AmountInput from '@components/ui/AmountInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import ImageInput from '@components/ui/ImageInput';
import PriceInput from '@components/ui/PriceInput';
import RadioButton from '@components/ui/RadioButton';
import Label from '@components/ui/Label';
import SelectionBox from '@components/ui/SelectionBox';

type ProductStepProps = {
  type: "Add" | "Edit"
}

const ProductStep = ({ type } : ProductStepProps) => {

  const { 
    control, 
    formState: { errors }, 
    clearErrors, 
    setError,
    setValue,
    watch
  } = useFormContext()

  const productVendorId = watch('vendorId')

  const handleChange = useCallback(
    debounce(async (sku: string) => {
      if (sku.length  === 0) return [];
      const isSkuValid = await validateSku(sku);
      if (!isSkuValid) {
        setError('productSku', {
          type: 'manual',
          message: 'SKU already exists'
        });
      } else {
        clearErrors('productSku');
      }
    }, 500),
    []
  );

  const { data: vendorList , isLoading: isFetching } = useQuery({
    queryKey: ['vendorList'],
    queryFn: async () => {
      const response = await getVendors();
      return response as VendorResponseType[]
    },
  })

  if (isFetching) {
    return <div>Loading...</div>
  }

  
  const filteredvendors = Array.isArray(vendorList) ? vendorList.map((vendor: VendorResponseType) => ({
    id: vendor._id,
    name: vendor.vendorCompanyName
  })) : []
  


  return (
    <section className="w-full h-full flex flex-col p-6 overflow-y-scroll ">
      
      <Controller
        name="productAvatar"
        control={control}
        defaultValue={null}
        render={({ field : {value, onChange} }) => (
          <ImageInput
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Label className="mt-6">Category</Label>
      <Controller
        name="productCategory"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange} }) => (
          <div className="flex mt-2 items-center justify-center gap-4 w-full">
            <RadioButton 
              className="h-10 w-full" 
              didError={!!errors.productCategory?.message}
              value="Component"
              checked={value === "Component"}
              setChecked={value => {
                onChange(value);
                clearErrors('productCategory');
              }}              
            />
            <RadioButton 
              className="h-10 w-full" 
              didError={!!errors.productCategory?.message}
              value="Medicine"
              checked={value === "Medicine"}
              setChecked={value => {
                onChange(value);
                clearErrors('productCategory');
              }}              
            />
          </div>
        )}
      />  
      <ErrorMessage message={errors.productCategory?.message} />

      <Label className="mt-6">SKU</Label>
      <Controller
        name="productSku"
        control={control}
        defaultValue=""
        render={({ field: {onChange, value} }) => (
          <Input
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="DTB-ELEC-500-WHT"
            didError={!!errors.productSku?.message}
            value={value}
            onChange={(e) => {
              onChange(e);
              clearErrors('productSku');
              handleChange(e.target.value);
            }}
          />
        )}
      />
      <ErrorMessage message={errors.productSku?.message} />


      <Label className="mt-6">Product Name</Label>
      <Controller
        name="productName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Arch wires"
            didError={!!errors.productName?.message}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('productName');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.productName?.message} />

      <div className="flex flex-col gap-2 z-10 mt-6">
        <Label>Vendor</Label>
        <SelectionBox 
          className="w-full"
          options={filteredvendors}
          placeholder="vendor"
          value={vendorList?.find((vendor: VendorResponseType) => vendor._id === productVendorId)?.vendorCompanyName || ""}
          setValue={(value) => {
            setValue('vendorId', value.id)
            clearErrors('vendorId')
          }}
          didError={!!errors?.vendorId}
        />
        <ErrorMessage message={errors?.vendorId?.message} />
      </div>

      <div className="flex items-start justify-center gap-4">
        <div className="flex flex-col w-full">
          <Label className="mt-6">Unit Price</Label>
          <Controller
            name="productUnitPrice"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <PriceInput
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="500.00"
                didError={!!errors.productUnitPrice?.message}
                maxLength={12}
                currency="₱"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('productUnitPrice');
                }}
              />
            )}
          />  
          <ErrorMessage message={errors.productUnitPrice?.message} />
        </div>
        {type === "Add" && (
          <div className="flex flex-col w-fit">
            <Label className="mt-6">Quantity</Label>
            <Controller
              name="productQuantity"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <AmountInput
                  className="h-10 w-full mt-2 flex-shrink-0" 
                  maxLength={9}
                  value={value}
                  didError={!!errors.productQuantity?.message}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors('productQuantity');
                  }}
                />
              )}
            />  
            <ErrorMessage message={errors.productQuantity?.message} />
          </div>
        )}
      </div>
      
      <Label className="mt-6">Description</Label>
      <Controller
        name="productDescription"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextArea
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Type a description here..."
            didError={!!errors.productDescription?.message}
            value={value}
            onChange={(e) => {
              onChange(e);
              clearErrors('productDescription');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.productDescription?.message} />
    </section>
  )
}

export default ProductStep
