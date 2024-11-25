import { useState } from 'react'
import ActivityHeader from './ActivityHeader'
import ActivityDataTable from './table/ActivityDataTable'

const ActivtiyOutlet = () => {
  const [ searchValue, setSearchValue ] = useState<string>('')
  return (
    <main className="h-full bg-white flex flex-col">
      <ActivityHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden h-full">
        <ActivityDataTable searchValue={searchValue} />
      </section>
    </main>
  )
}

export default ActivtiyOutlet
