import { usePatientStore } from '../../stores/patient.store';
import {  FormProvider } from "react-hook-form"
import DrawerHeader from '@components/shared/DrawerHeader';
import DrawerFooter from '@components/shared/DrawerFooter';
import useEditPatient from "../../hooks/useEditPatient";
import NewPatientStep from "../steps/NewPatientStep";


const EditPatientForm = () => {


  const step = 1
  const isFinal = true
  const methods = useEditPatient()
  const { handleSubmit, onSubmit } = methods
  const setPatientDrawerOpen = usePatientStore((state) => state.setPatientDrawerOpen)
  const selectedPatient = usePatientStore((state) => state.selectedPatient)
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
          title={"Edit " + selectedPatient.patientFullName}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="flex flex-col h-full overflow-y-hidden ">
          <NewPatientStep />
        </section>
        <DrawerFooter 
          handleClose={handleClose}
          handleSubmit={(e)=>handleSubmit(e)}
          step={step}
          setStep={() => {}}
          isLoading={isLoading}
          isFinal={isFinal}
        />
      </form>
    </FormProvider>  
  )
}

export default EditPatientForm