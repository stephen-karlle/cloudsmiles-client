import { FormProvider } from "react-hook-form"
import { usePatientStore } from '../../stores/patient.store';
import DrawerHeader from '@components/shared/DrawerHeader';
import DrawerFooter from '@components/shared/DrawerFooter';
import useAddPatient from '../../hooks/useAddPatient';
import NewPatientStep from "../steps/NewPatientStep";


const AddNewPatientForm = () => {

  const methods = useAddPatient()
  const { handleSubmit, onSubmit } = methods
  const setPatientDrawerOpen = usePatientStore((state) => state.setPatientDrawerOpen)
  const isLoading = usePatientStore((state) => state.isLoading)

  const handleClose = () => {
    setPatientDrawerOpen(false)
  }
  
  return (
    <FormProvider {...methods}>      
      <form 
        className="w-full h-full flex flex-col flex-grow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerHeader 
          title="Add New Patient"
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="flex flex-col h-full overflow-y-hidden ">
          <NewPatientStep />
        </section>
        <DrawerFooter 
          handleClose={handleClose}
          handleSubmit={(e)=>handleSubmit(e)}
          step={1}
          setStep={() => {}}
          isLoading={isLoading}
          isFinal={true}
        />
      </form>
    </FormProvider>  
  )
}

export default AddNewPatientForm