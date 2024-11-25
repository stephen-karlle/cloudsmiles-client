import { useState } from "react"
import { usePatientStore } from "../../stores/patient.store.ts"
import PatientHeader from "../PatientHeader.tsx"
import PatientDataTable from "../table/PatientDataTable.tsx"
import Drawer from "@components/ui/Drawer.tsx"


const PatientOutlet = () => {


  const [ searchValue, setSearchValue ] = useState<string>("")
  const isPatientDrawerOpen = usePatientStore((state) => state.isPatientDrawerOpen)
  const mainSheet = usePatientStore((state) => state.mainSheet)


  return (
    <main className="h-full bg-white flex flex-col">
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isPatientDrawerOpen}
        activeSheets={[]}
      />
      <PatientHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden">
        <PatientDataTable searchValue={searchValue} />
      </section>
    </main>

  )
}

export default PatientOutlet
