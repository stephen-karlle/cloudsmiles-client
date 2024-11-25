import { useState } from "react"
import StaffHeader from "../StaffHeader"
import AssistantDataTable from "../table/assistant/AssistantDataTable"

const AssistantOutlet = () => {

  const [ searchValue, setSearchValue ] = useState<string>("")

  return (
    <main className="h-full bg-white flex flex-col">
      <StaffHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden">
        <AssistantDataTable searchValue={searchValue} />
      </section>
    </main>
  )
}

export default AssistantOutlet
