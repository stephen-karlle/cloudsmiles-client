import { useState } from 'react'
import PaymentHeader from '../PaymentHeader'
import PaymentDataTable from '../table/PaymentDataTable'

const PaymentOutlet = () => {

  const [ searchValue, setSearchValue ] = useState<string>('')
  
  return (
    <main className="h-full bg-white flex flex-col">
      <PaymentHeader onChange={setSearchValue} />
      <section className="flex-grow overflow-y-hidden">
        <PaymentDataTable searchValue={searchValue} />
      </section>
    </main>
  )
}

export default PaymentOutlet
