import KnowledgeHeader from "../KnowledgeHeader.tsx"
import RequestDataTable from "../table/request/RequestDataTable.tsx"


const RequestOutlet = () => {


  return (
    <main className="h-full bg-white flex flex-col">
      <KnowledgeHeader />
      <section className="flex-grow overflow-y-hidden ">
        <RequestDataTable />
      </section>
    </main>

  )
}

export default RequestOutlet