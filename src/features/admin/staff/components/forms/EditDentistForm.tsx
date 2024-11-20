import { validateEmail } from '@features/guest/authentication/signup/services/signup.services'
import { FormProvider } from 'react-hook-form'
import { MouseEvent } from 'react'
import { useStaffStore } from '../../stores/staff.store'
import { dentistsStepsConstants } from '../../constants/dentists.constants'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import DetailsStep from '../steps/DetailsStep'
import Stepper from '@components/ui/Stepper'
import ServicesStep from '../steps/ServicesStep'
import ScheduleStep from '../steps/ScheduleStep'
import useEditDentist from '../../hooks/useEditDentist'


const EditDentistForm = () => {

  const methods = useEditDentist()
  const { handleSubmit, onSubmit, reset, trigger, watch, setError  } = methods


  const step = useStaffStore((state) => state.step)
  const setStep = useStaffStore((state) => state.setStep)
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const isLoading = useStaffStore((state) => state.isLoading)
  const setIsLoading = useStaffStore((state) => state.setIsLoading)
  const selectedDentist = useStaffStore((state) => state.selectedDentist)
  const oldEmail = selectedDentist.dentistCredentialId.credentialEmail
  const email = watch('dentistEmail')


  const isFinal = step === 3
  
  const handleClose = () => {
    setStaffDrawerOpen(false)
    setStep(1)
    reset()
  }

  const validateDetailsStep = async () => {
    setIsLoading(true)
    const isDetailsStepValid = await trigger([
      'dentistEmploymentType', 
      'dentistDateOfBirth',
      'dentistGender',
      'dentistFullName', 
      'dentistSpecialization', 
      'dentistEmail', 
      'dentistPhoneNumber', 
      'dentistAddress',
    ])

    if (!isDetailsStepValid) {
      setIsLoading(false)
      return false
    }

    
    if (email === oldEmail ) {
      setIsLoading(false)
      return isDetailsStepValid;
    }


    const isEmailValid = await validateEmail(email)
    if (!isEmailValid) {
      setError('dentistEmail', {
        type: 'manual',
        message: 'Email already exists'
      })
      setIsLoading(false)
      return false
    }
    setIsLoading(false)

    return isDetailsStepValid;
  }
    


  const validateServicesStep = async () => {
    const isServicesStepValid = await trigger([
      "dentistMedicalServices", 
      "dentistCosmeticServices"
    ]); 
    return isServicesStepValid;
  }

  const validateScheduleStep = async () => {
    const isScheduleStepValid = await trigger(["dentistSchedule"]); 
    return isScheduleStepValid;
  }


  const handleNextStep = async (e: MouseEvent) => {
    e.preventDefault();
    let isValid: boolean = false;
    switch (step) {
      case 1:
        isValid = await validateDetailsStep();
        break;
      case 2:
        isValid = await validateServicesStep();
        break;
      case 3:
        isValid = await validateScheduleStep();
        break; 
      default:
        break;
    }
    
    if (isValid) {
      setStep(step + 1);
      return;
    }
  }



  return (
    <FormProvider {...methods}>     
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col flex-grow"
      >      
        <DrawerHeader
          title={`Edit Dr. ${selectedDentist?.dentistFullName}`}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="mt-6 mb-4 mx-4">            
          <Stepper
            steps={dentistsStepsConstants}
            step={step}
            setStep={setStep}
          />
        </section>
        <section className="flex flex-col h-full overflow-y-hidden ">
          { step === 1 &&  <DetailsStep type="dentist" /> }
          { step === 2 &&  <ServicesStep /> }
          { step === 3 &&  <ScheduleStep type="dentist" /> }
        </section>
        <DrawerFooter 
          handleClose={handleClose}
          handleSubmit={(e)=>handleNextStep(e)}
          step={step}
          setStep={setStep}
          isLoading={isLoading}
          isFinal={isFinal}
        />
      </form>
    </FormProvider>     
  )
}

export default EditDentistForm
