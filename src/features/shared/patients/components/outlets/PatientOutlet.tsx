import { usePatientStore } from "../../stores/patient.store.ts"
import PatientHeader from "../PatientHeader.tsx"
import PatientDataTable from "../table/PatientDataTable.tsx"
import Drawer from "@components/ui/Drawer.tsx"


const PatientOutlet = () => {


  const isPatientDrawerOpen = usePatientStore((state) => state.isPatientDrawerOpen)
  const mainSheet = usePatientStore((state) => state.mainSheet)



  return (
    <main className="h-full bg-white flex flex-col">
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isPatientDrawerOpen}
        activeSheets={[]}
      />
      <PatientHeader />
      <section className="flex-grow overflow-y-hidden">
        <PatientDataTable />
      </section>
    </main>

  )
}

export default PatientOutlet