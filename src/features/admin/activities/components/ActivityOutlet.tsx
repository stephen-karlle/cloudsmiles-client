import ActivityHeader from './ActivityHeader'
import ActivityDataTable from './table/ActivityDataTable'

const ActivtiyOutlet = () => {

  return (
    <main className="h-full bg-white flex flex-col">
      <ActivityHeader />
      <section className="flex-grow overflow-y-hidden h-full">
        <ActivityDataTable />
      </section>
    </main>
  )
}

export default ActivtiyOutlet
