import { useDrawerStore } from '@stores/drawer.store'
import { FormProvider } from 'react-hook-form'
import { useStocksStore } from '../../stores/stocks.store'
import useAddNewProduct from '../../hooks/useAddNewProduct'
import DrawerHeader from '@components/shared/DrawerHeader'
import DrawerFooter from '@components/shared/DrawerFooter'
import ProductStep from '../steps/ProductStep'



const AddNewProductForm = () => {
  const methods = useAddNewProduct()

  const { 
    reset,
    onSubmit,
    handleSubmit,
   } = methods


  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const isLoading = useStocksStore((state) => state.isLoading)


  const handleClose = () => {
    reset()
    setDrawerOpen(false)
  }
  

  return (
    <FormProvider {...methods}>
      <form 
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerHeader 
          title="Add New Product"
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <ProductStep type="Add" /> 
        <DrawerFooter
          handleSubmit={handleSubmit(onSubmit)}
          handleClose={handleClose}
          isLoading={isLoading}
          isFinal={true}
        />
      </form>
    </FormProvider>
  )
}

export default AddNewProductForm
