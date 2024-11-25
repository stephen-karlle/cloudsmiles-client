import { useState } from "react"
import KnowledgeHeader from "../KnowledgeHeader.tsx"
import ContextDataTable from "../table/context/ContextDataTable.tsx"


const ContextOutlet = () => {


  const [searchValue, setSearchValue] = useState<string>("")


  return (
    <main className="h-full bg-white flex flex-col">
      <KnowledgeHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden ">
        <ContextDataTable searchValue={searchValue} />
      </section>
    </main>

  )
}

export default ContextOutlet
