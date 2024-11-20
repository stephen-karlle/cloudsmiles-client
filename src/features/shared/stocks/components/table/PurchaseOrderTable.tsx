import { ProductResponseType } from "../../types/product.types"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import AmountInput from "@components/ui/AmountInput"
import CloseIcon from "@icons/linear/CloseIcon"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import { useStocksStore } from "../../stores/stocks.store"

type PurchaseOrderTableProps = {
  products: ProductResponseType[]
  type: "Add" | "Edit"
}

const header = [
  {
    title: 'NAME',
    sortable: true,
  },
  {
    title: 'COST',
    sortable: true,
  },
  {
    title: 'QUANTITY',
    sortable: false,
  },
  {
    title: '',
    sortable: false,
  },
]

const PurchaseOrderTable = ({
  products,
  type
}:PurchaseOrderTableProps ) => {

  const gridTemplate = "grid-cols-[auto_20%_30%_5%]"
  const { control, watch, formState: { errors }, getValues, reset} = useFormContext()

  const { remove: removeProduct } = useFieldArray({
    control,
    name: "orderProducts"
  })

  const orderProducts = watch('orderProducts') as ProductResponseType[]


  const handleRemove = (index: number) => {
    removeProduct(index)
    reset({
      ...getValues(),
      orderProducts: orderProducts.filter((_, idx) => idx !== index),
    }) 
  }
  
  const selectedOrder = useStocksStore((state) => state.selectedOrder)



  return (
    <table className="flex flex-col gap-2">
      <thead className={` px-1 `}>
        <tr
          className={`grid py-2 px-4 h-fit w-full bg-gray-50 rounded-md ${gridTemplate}`}
        >
          {header.map((item, index) => (
            <td
              key={index}
              className=" w-full flex items-center justify-start gap-2 rounded-md uppercase text-right text-gray-500 text-sm font-normal"
            >
              {item.title}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white h-full flex flex-col overflow-y-auto w-full p-1 gap-2">
        {products.length > 0 ? (
          products.map((product, index) => {
            const productQuantity = watch(`orderProducts[${index}].productQuantity`)
            return (            
              <tr
                key={index}
                className={`grid px-2 h-12 w-full items-center bg-white rounded-md ${gridTemplate} `}
              >
                <td className="w-full flex flex-col items-start font-normal px-1 overflow-hidden">
                  <label className="text-gray-700 text-md truncate max-w-full overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                    {product.productName}
                  </label>
                  <label className="text-gray-500 text-sm truncate max-w-full overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                    #{product.productSku}
                  </label>
                </td>
                <td className="w-full flex items-center text-sm text-gray-700 font-normal ">
                  <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
                  {(product.productUnitPrice * productQuantity).toLocaleString('en-US')}
                </td>
                <td className="w-full flex items-start  text-gray-500 font-normal">
                  <Controller
                    name={`orderProducts[${index}].productQuantity`}
                    control={control}
                    render={({ field: { value, onChange} }) => (
                      <AmountInput 
                        className="w-[80%]"
                        value={value}
                        onChange={(value) => onChange(value)}
                        maxLength={5}
                        size="sm"
                        min={type === "Edit" ? selectedOrder.orderProducts[index]?.productQuantity : 0}
                        didError={Boolean((errors?.orderProducts as any)?.[index]?.productQuantity?.message) as boolean}
                      />
                    )}
                  />
                </td>
                <td className="w-full flex items-center justify-end  ">
                  <button 
                    className="w-6 h-full flex items-center justify-center"
                    onClick={()=>handleRemove(index)}
                    type="button"
                  >
                    <CloseIcon className="w-5 h-5 stroke-2 stroke-red-500" />
                  </button>
                </td>
              </tr>
            )
          })
        ) : (
          <tr className="grid px-2 h-40 w-full items-center bg-white rounded-md">
            <td className="w-full items-center justify-center flex flex-col px-1">
              <h1 className="text-lg font-medium text-gray-700">No products added</h1>
              <p className="text-sm text-gray-500">Add products to order</p>
            </td>
          </tr>
        )}  
      </tbody>
    </table>
  )
}

export default PurchaseOrderTable