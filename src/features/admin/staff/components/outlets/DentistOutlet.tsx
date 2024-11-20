import StaffHeader from "../StaffHeader"
import DentistDataTable from "../table/dentist/DentistDataTable"

const DentistOutlet = () => {


  return (
    <main className="h-full bg-white flex flex-col">
      <StaffHeader />
      <section className="flex-grow overflow-y-hidden">
        <DentistDataTable />
      </section>
    </main>
  )
}

export default DentistOutlet