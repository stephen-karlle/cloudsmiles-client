import { FormProvider } from 'react-hook-form'
import { useStocksStore } from '../../stores/stocks.store'
import { useDrawerStore } from '@stores/drawer.store'
import useEditProduct from '../../hooks/useEditProduct'
import DrawerHeader from '@components/shared/DrawerHeader'
import DrawerFooter from '@components/shared/DrawerFooter'
import ProductStep from '../steps/ProductStep'



const EditProductForm = () => {
  const methods = useEditProduct()
  const isLoading = useStocksStore((state) => state.isLoading)
  const closeDrawer = useDrawerStore((state) => state.closeDrawer)

  
  const { 
    reset,
    onSubmit,
    handleSubmit,
    watch
  } = methods
  const productName = watch('productName')


  const handleClose = () => {
    closeDrawer()
    reset()
  }


  return (
    <FormProvider {...methods}>
      <form 
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerHeader 
          title={`Edit ${productName}`}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <ProductStep type="Edit" /> 
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

export default EditProductForm
