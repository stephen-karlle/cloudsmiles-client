import { useState } from "react"
import KnowledgeHeader from "../KnowledgeHeader.tsx"
import RequestDataTable from "../table/request/RequestDataTable.tsx"


const RequestOutlet = () => {

  const [searchValue, setSearchValue] = useState<string>("")

  return (
    <main className="h-full bg-white flex flex-col">
      <KnowledgeHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden ">
        <RequestDataTable searchValue={searchValue} />
      </section>
    </main>

  )
}

export default RequestOutlet
