import { FormProvider } from 'react-hook-form'
import { useKnowledgeStore } from '../../stores/knowledge.store'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import useReviewRequest from '../../hooks/useReviewRequest'
import ReviewRequestInformationStep from '../step/ReviewRequestInformationStep'

const ReviewRequestForm = () => {
  const step = 1
  const isFinal = true

  const methods = useReviewRequest()
  const { handleSubmit, onSubmit, reset } = methods

  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen)   
  const selectedRequest = useKnowledgeStore((state) => state.selectedRequest)
  const isLoading = useKnowledgeStore((state) => state.isLoading)




  const handleClose = () => {
    setKnowledgeDrawerOpen(false)
    reset()
  }



  return (
    <FormProvider {...methods}>      
      <form 
        className="w-full h-full flex flex-col flex-grow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerHeader 
          title={`Reviewing #${selectedRequest?.requestSerialId}`}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="flex flex-col h-full overflow-y-hidden ">
          <ReviewRequestInformationStep />
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

export default ReviewRequestForm