import { FormProvider } from 'react-hook-form';
import { useDrawerStore } from '@stores/drawer.store';

import useAddVendor from '../../hooks/useAddVendor';
import DrawerFooter from '@components/shared/DrawerFooter';
import DrawerHeader from '@components/shared/DrawerHeader';
import VendorStep from '../steps/VendorStep';

const NewVendorForm = () => {

  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const methods = useAddVendor()
  const isLoading = useDrawerStore((state) => state.isLoading)

  const { 
    handleSubmit,
    onSubmit,
   } = methods


   const handleClose = () => {
    setDrawerOpen(false)
   }

  return (
    <FormProvider {...methods}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >  
        <DrawerHeader 
          title="Add Vendor"
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <VendorStep />
        <DrawerFooter
          handleClose={handleClose}
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </form>
    </FormProvider>  
  )
}

export default NewVendorForm