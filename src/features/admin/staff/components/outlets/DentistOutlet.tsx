import { useState } from "react"
import StaffHeader from "../StaffHeader"
import DentistDataTable from "../table/dentist/DentistDataTable"

const DentistOutlet = () => {

  const [searchValue, setSearchValue] = useState<string>("")

  return (
    <main className="h-full bg-white flex flex-col">
      <StaffHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden">
        <DentistDataTable searchValue={searchValue} />
      </section>
    </main>
  )
}

export default DentistOutlet
