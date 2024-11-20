import { useCallback, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { findProducts } from "../../services/product.services"
import { debounce } from "@utils/debounce"
import { getVendors } from "@features/shared/vendors/services/vendor.services"
import { VendorResponseType } from "@features/shared/vendors/types/vendor.types"
import { ProductResponseType } from "../../types/product.types"

import TextArea from "@components/ui/TextArea"
import Label from "@components/ui/Label"
import SearchInput from "@components/ui/SearchInput"
import Avatar from "@components/ui/Avatar"
import Switch from "@components/ui/Switch"
import PurchaseOrderTable from "../table/PurchaseOrderTable"
import SelectionBox from "@components/ui/SelectionBox"
import ErrorMessage from "@components/ui/ErrorMessage"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"

type OrderStepProps = {
  type: "Add" | "Edit"
}

const OrderStep = ({type } : OrderStepProps) => {

  const [ productQuery, setProductQuery ] = useState<string>('')
  const [ productList, setProductList ] = useState<ProductResponseType[]>([])

  
  const { 
    control,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useFormContext()
  const { append: appendProduct } = useFieldArray({
    control,
    name: "orderProducts"
  })

  const orderProducts = watch('orderProducts') as ProductResponseType[]
  const orderVendorId = watch('orderVendorId')

  const handleChange = useCallback(
    debounce(async (value: string) => {
      if (value.length === 0) return; 
      const products = await findProducts(value);
      
      const filteredProducts = products.filter((product: ProductResponseType) => {
        return !orderProducts.some((orderProduct: ProductResponseType) => orderProduct._id === product._id);
      });
      
      setProductList(filteredProducts);
    }, 500),
    [orderProducts] 
  )
  
  
  const handleProductSelect = (product: ProductResponseType) => {
    const isExist = orderProducts.some((item: ProductResponseType) => item._id === product._id)
    if (isExist) return 
    clearErrors('orderProducts')
    type === "Add"
    ? appendProduct({
        ...product,
        productId: product._id,
        productQuantity: 1,
      })
    : appendProduct({
      productId: product._id,
      productName: product.productName,
      productQuantity: 1,
      productReceived: 0,
      productSku: product.productSku,
      productStatus: "pending",
      productUnitPrice: product.productUnitPrice,
    });
  
    
    setProductQuery("")
    setProductList([])
  }

  const { data: vendorList , isLoading: isFetching } = useQuery({
    queryKey: ['vendorList'],
    queryFn: async () => {
      const response = await getVendors();
      return response as VendorResponseType[]
    },
  })

  
  if (isFetching) return <div>Loading...</div>


  const filteredvendors = Array.isArray(vendorList) ? vendorList.map((vendor: VendorResponseType) => ({
    id: vendor._id,
    name: vendor.vendorCompanyName
  })) : []

  const totalCost = orderProducts.reduce((acc, product) => {
    return acc + (product.productQuantity * product.productUnitPrice)
  }, 0)
  

  return (
    <section className="w-full h-full overflow-y-scroll flex flex-col p-6 gap-4">
      <div className="flex flex-col gap-2 z-10">
        <Label>Vendor</Label>
        <SelectionBox 
          className="w-full"
          options={filteredvendors}
          placeholder="vendor"
          value={vendorList?.find((vendor: VendorResponseType) => vendor._id === orderVendorId)?.vendorCompanyName || ""}
          setValue={(value) => {
            setValue('orderVendorId', value.id)
            clearErrors('orderVendorId')
          }}
          didError={!!errors?.orderVendorId}
        />
        <ErrorMessage message={errors?.orderVendorId?.message} />
      </div>
      <div className="flex flex-col ring-1 ring-gray-200 rounded-md p-4 gap-2">
        <h1 className="text-lg font-medium text-gray-700 flex flex-col">Add Products</h1>
        <SearchInput
          type="text"
          className="h-10 w-full mt-2 flex-shrink-0 mb-4" 
          placeholder="Arch Wires"
          value={productQuery}
          onChange={(e) => {
            const query = e.target.value;
            setProductQuery(query);
            if (query.length === 0) {
              setProductList([]);
            } else {
              handleChange(query); 
            }
          }}
          
          isOpen={productQuery.length > 0 && productList.length > 0}
        >
          {productList.map((product, index) => (
            <button key={index} 
              type="button" 
              className="flex items-center justify-start cursor-pointer rounded-md gap-4"
              onClick={()=>handleProductSelect(product)}
            >
              <Avatar 
                className=""
                src={product.productAvatar}
                name={product.productName}
              />
              <div className="flex flex-col w-full items-start justify-center">
                <span className="text-base text-gray-700">{product.productName}</span>
                <span className="text-sm text-gray-500">{product.productSku}</span>
              </div>
            </button>
          ))}
        </SearchInput>
        <PurchaseOrderTable products={orderProducts} type={type}/>
        <hr className="w-full border border-dashed border-gray-200 my-2" />
        <div className="w-full flex items-center justify-end gap-1 ">
          <h1 className="text-base  text-gray-500">Total Cost:</h1>
          <h1 className="text-lg font-medium text-gray-700 flex items-center justify-center">
            <PhilippinePesoIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            {totalCost.toLocaleString('en-US')} 
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Notes</Label>
        <Controller
          name="orderNotes"
          control={control}
          render={({ field: { value, onChange} }) => (
            <TextArea 
              placeholder="Add notes here..."
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <hr className="border-t border-gray-200 mt-2" />
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium text-gray-700">Send Email</h1>
        <div className="flex gap-2">
          <Controller
            name="orderSendEmail"
            control={control}
            render={({ field: { value, onChange} }) => (
              <Switch 
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Label>
            Send an invoice to the vendor after the purchase order is created.
          </Label>
        </div>
      </div>
    </section>  
  )
}

export default OrderStep