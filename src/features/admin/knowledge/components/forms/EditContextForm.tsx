import { FormProvider } from 'react-hook-form'
import { useKnowledgeStore } from '../../stores/knowledge.store'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import useEditContext from '../../hooks/useEditContext'
import EditContextInformationStep from '../step/EditContextInformationStep'

const EditContextForm = () => {
  const step = 1
  const isFinal = true

  const methods = useEditContext()
  const { handleSubmit, onSubmit, reset } = methods

  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen)   
  const selectedContext = useKnowledgeStore((state) => state.selectedContext)
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
          title={`Editing #${selectedContext?.contextSerialId}`}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <section className="flex flex-col h-full overflow-y-hidden ">
          <EditContextInformationStep />
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

export default EditContextForm