import KnowledgeHeader from "../KnowledgeHeader.tsx"
import ContextDataTable from "../table/context/ContextDataTable.tsx"


const ContextOutlet = () => {



  return (
    <main className="h-full bg-white flex flex-col">
      <KnowledgeHeader />
      <section className="flex-grow overflow-y-hidden ">
        <ContextDataTable />
      </section>
    </main>

  )
}

export default ContextOutlet