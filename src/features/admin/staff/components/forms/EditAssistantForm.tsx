import { FormProvider } from 'react-hook-form'
import { MouseEvent } from 'react'
import { useStaffStore } from '../../stores/staff.store'
import { assistantStepsConstants } from '../../constants/assistant.constants'
import { validateEmail } from '@features/guest/authentication/signup/services/signup.services'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import DetailsStep from '../steps/DetailsStep'
import Stepper from '@components/ui/Stepper'
import ScheduleStep from '../steps/ScheduleStep'
import useEditAssistant from '../../hooks/useEditAssistant'

const EditAssistantForm = () => {

  const methods = useEditAssistant()
  const selectedAssistant = useStaffStore((state) => state.selectedAssistant)
  const { handleSubmit, onSubmit, reset, trigger, watch, setError } = methods
  const step = useStaffStore((state) => state.step)
  const setStep = useStaffStore((state) => state.setStep)
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const isLoading = useStaffStore((state) => state.isLoading)
  const setIsLoading = useStaffStore((state) => state.setIsLoading)

  const oldEmail = selectedAssistant.assistantCredentialId.credentialEmail
  const email = watch('assistantEmail')
  const isFinal = step === 2
  
  const handleClose = () => {
    setStaffDrawerOpen(false)
    setStep(1)
    reset()
  }

  const validateDetailsStep = async () => {
    setIsLoading(true)
    const isDetailsStepValid = await trigger([
      'assistantEmploymentType', 
      'assistantGender',
      'assistantDateOfBirth',
      'assistantFullName', 
      'assistantEmail', 
      'assistantPhoneNumber', 
      'assistantRole',
      'assistantAddress'
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
      setError('assistantEmail', {
        type: 'manual',
        message: 'Email already exists'
      })
      setIsLoading(false)
      return false
    }
    setIsLoading(false)

    return isDetailsStepValid;
  }

  const validateScheduleStep = async () => {
    const isScheduleStepValid = await trigger(["assistantSchedule"]); 
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
          title={"Edit " + selectedAssistant.assistantFullName}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="mt-6 mb-4 mx-4">            
          <Stepper
            steps={assistantStepsConstants}
            step={step}
            setStep={setStep}
          />
        </section>
        <section className="flex flex-col h-full overflow-y-hidden ">
          { step === 1 &&  <DetailsStep type="assistant" /> }
          { step === 2 &&  <ScheduleStep type="assistant" /> }
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

export default EditAssistantForm
