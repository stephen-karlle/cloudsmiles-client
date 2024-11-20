import PaymentHeader from '../PaymentHeader'
import PaymentDataTable from '../table/PaymentDataTable'

const PaymentOutlet = () => {

  
  return (
    <main className="h-full bg-white flex flex-col">
      <PaymentHeader />
      <section className="flex-grow overflow-y-hidden">
        <PaymentDataTable />
      </section>
    </main>
  )
}

export default PaymentOutlet
