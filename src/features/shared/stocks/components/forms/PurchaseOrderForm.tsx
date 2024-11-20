import { useDrawerStore } from "@stores/drawer.store"
import { FormProvider } from "react-hook-form"
import { useStocksStore } from "../../stores/stocks.store"

import DrawerFooter from "@components/shared/DrawerFooter"
import DrawerHeader from "@components/shared/DrawerHeader"
import usePurchaseOrder from "../../hooks/usePurchaseOrder"
import OrderStep from "../steps/OrderStep"




const PurchaseOrderForm = () => {

  const methods = usePurchaseOrder()
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const isLoading = useStocksStore((state) => state.isLoading)
  
  const { 
    onSubmit, 
    handleSubmit, 
    reset,
  } = methods



  const handleClose = () => {
    setDrawerOpen(false)
    reset()
  }





  return (
    <FormProvider {...methods}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerHeader 
          title="Order Product"
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <OrderStep type="Add" />
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

export default PurchaseOrderForm 