import { useFormContext } from 'react-hook-form'
import { useDrawerStore } from '@stores/drawer.store'
import { MouseEvent } from 'react'
import { useTreatmentStore } from '../../stores/treatment.store'
import BasicInformationStep from '../steps/BasicInformationStep'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'

const EditTreatmentForm = () => {

  const { trigger, reset} = useFormContext()

  const step = useDrawerStore((state) => state.step)
  const setStep = useDrawerStore((state) => state.setStep)
  const setDrawerOpen = useTreatmentStore((state) => state.setTreatmentDrawerOpen)
  const isLoading = useDrawerStore((state) => state.isLoading)


  const handleClose = () => {
    setDrawerOpen(false)
    setStep(1)
    reset()
  }

  const validateBasicInformationStep = async () => {
    const isValid = await trigger(["treatmentName", "treatmentCategory", "treatmentDescription", "treatmentCost", "treatmentDuration"]);
    return isValid
  };



  const handleNextStep = async (e: MouseEvent) => {
    e.preventDefault()
    let isValid = false;
    switch (step) {
      case 1:
        isValid = await validateBasicInformationStep();
        break;
      default:
        break;
    }
    if (isValid) {
      setStep(step + 1);
      return
    }
  }

  return (
    <article 
      className="w-full h-full flex flex-col"
    >
      <DrawerHeader 
        title="Edit Treatment"
        handleClose={handleClose}
        isLoading={isLoading}
      />
      <section className="overflow-y-scroll px-6 py-4 h-full overflow-x-hidden outline-none ">
        <BasicInformationStep />
      </section>
      <DrawerFooter 
        handleClose={handleClose}
        handleSubmit={handleNextStep}
        step={step}
        setStep={setStep}
        isLoading={isLoading}
        isFinal={true}
      />
    </article>
  )
}

export default EditTreatmentForm
