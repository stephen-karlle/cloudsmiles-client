import { FormProvider } from 'react-hook-form';
import { useDrawerStore } from '@stores/drawer.store';
import useEditVendor from '../../hooks/useEditVendor';
import DrawerFooter from '@components/shared/DrawerFooter';
import DrawerHeader from '@components/shared/DrawerHeader';
import VendorStep from '../steps/VendorStep';

const EditVendorForm = () => {

  const methods = useEditVendor()
  const closeDrawer = useDrawerStore((state) => state.closeDrawer)
  const isLoading = useDrawerStore((state) => state.isLoading)

  const { 
    handleSubmit,
    onSubmit,
    watch,
   } = methods

   const companyName = watch('vendorCompanyName')


   const handleClose = () => {
    closeDrawer()
   }



  return (
    <FormProvider {...methods}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >  
        <DrawerHeader 
          title={`Edit ${companyName}`}
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

export default EditVendorForm