import StaffHeader from "../StaffHeader"
import AssistantDataTable from "../table/assistant/AssistantDataTable"

const AssistantOutlet = () => {


  return (
    <main className="h-full bg-white flex flex-col">
      <StaffHeader />
      <section className="flex-grow overflow-y-hidden">
        <AssistantDataTable />
      </section>
    </main>
  )
}

export default AssistantOutlet