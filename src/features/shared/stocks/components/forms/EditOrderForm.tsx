import { useDrawerStore } from "@stores/drawer.store"
import { FormProvider } from "react-hook-form"
import { useStocksStore } from "../../stores/stocks.store"

import DrawerFooter from "@components/shared/DrawerFooter"
import DrawerHeader from "@components/shared/DrawerHeader"
import useEditOrder from "../../hooks/useEditOrder"
import OrderStep from "../steps/OrderStep"




const EditOrderForm = () => {

  const methods = useEditOrder()
  const selectedOrder = useStocksStore((state) => state.selectedOrder)
  const closeDrawer = useDrawerStore((state) => state.closeDrawer)
  const isLoading = useStocksStore((state) => state.isLoading)
  
  const { 
    onSubmit, 
    handleSubmit, 
    reset,
  } = methods


  const handleClose = () => {
    closeDrawer()
    reset()
  }



  return (
    <FormProvider {...methods}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerHeader 
          title={`Edit #${selectedOrder.orderSerialId}`}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <OrderStep type="Edit" />
        <DrawerFooter
          handleClose={handleClose}
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isFinal={true}
        />
      </form>  
    </FormProvider>
  )
}

export default EditOrderForm 