import { FormProvider } from 'react-hook-form'
import { useKnowledgeStore } from '../../stores/knowledge.store'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import ContextInformationStep from '../step/AddContextInformationStep'
import useAddContext from '../../hooks/useAddContext'

const AddContextForm = () => {
  const step = 1
  const isFinal = true

  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen)   
  const isLoading = useKnowledgeStore((state) => state.isLoading)


  const methods = useAddContext()
  const { handleSubmit, onSubmit, reset } = methods

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
          title="Add New Context"
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="flex flex-col h-full overflow-y-hidden ">
          <ContextInformationStep />
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

export default AddContextForm