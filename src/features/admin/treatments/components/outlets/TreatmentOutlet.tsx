import { useState } from 'react'
import { useDrawerStore } from '@stores/drawer.store'
import { FormProvider } from "react-hook-form"
import { useTreatmentStore } from '../../stores/treatment.store'
import TreatmentHeader from '../TreatmentHeader'
import AddNewTreatmentForm from '../forms/AddNewTreatmentForm'
import Drawer from '@components/ui/Drawer'
import useAddNewTreatment from '../../hooks/useAddNewTreatment'
import TreatmentDataTable from '../table/treatment/TreatmentDataTable'
import EditTreatmentForm from '../forms/EditTreatmentForm'
import useEditTreatment from '../../hooks/useEditTreatment'

const TreatmentOutlet = () => {
  const [ searchValue, setSearchValue ] = useState('')

  const isAddDrawerOpen = useDrawerStore((state) => state.isDrawerOpen)
  const activeSheets = useDrawerStore((state) => state.activeSheets)
  const isEditDrawerOpen = useTreatmentStore((state) => state.isTreatmentDrawerOpen)

  const addMethods = useAddNewTreatment()
  const editMethods = useEditTreatment()
  const { onSubmit: addOnSubmit, handleSubmit: addHandleSubmit } = addMethods
  const { onSubmit: editOnSubmit, handleSubmit: editHandleSubmit } = editMethods

  return (
    <main className="h-full bg-white flex flex-col">
      <FormProvider {...editMethods}>
        <form
          onSubmit={editHandleSubmit(editOnSubmit)}
        >        
          <Drawer 
            mainSheet={{ 
              name: "MainSheet1",
              component: <EditTreatmentForm />
            }}
            isOpen={isEditDrawerOpen}
            activeSheets={activeSheets} 
          />
        </form>
      </FormProvider>
      <FormProvider {...addMethods}>
        <form
          onSubmit={addHandleSubmit(addOnSubmit)}
        >        
          <Drawer 
            mainSheet={{ 
              name: "MainSheet2",
              component: <AddNewTreatmentForm />
            }}
            isOpen={isAddDrawerOpen}
            activeSheets={activeSheets} 
          />
        </form>
      </FormProvider>
      <TreatmentHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden">
        <TreatmentDataTable searchValue={searchValue} />
      </section>
    </main>
  )
}

export default TreatmentOutlet
