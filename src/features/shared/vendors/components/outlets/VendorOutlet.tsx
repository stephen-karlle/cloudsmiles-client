import { useState } from "react"
import VendorHeader from "../VendorHeader"
import VendorDataTable from "../table/vendor/VendorDataTable"

const VendorOutlet = () => {

  const [ searchValue, setSearchValue ] = useState<string>('')

  return (
    <main className="h-full bg-white flex flex-col">
      <VendorHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden">
        <VendorDataTable searchValue={searchValue} />
      </section>
    </main>
  )
}

export default VendorOutlet
