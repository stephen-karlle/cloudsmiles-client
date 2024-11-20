import VendorHeader from "../VendorHeader"
import VendorDataTable from "../table/vendor/VendorDataTable"

const VendorOutlet = () => {


  return (
    <main className="h-full bg-white flex flex-col">
      <VendorHeader />
      <section className="flex-grow overflow-y-hidden">
        <VendorDataTable />
      </section>
    </main>
  )
}

export default VendorOutlet