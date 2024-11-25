import MoneyIcon from "@icons/linear/MoneyIcon";

type PaymentGraphProps = {
  data: number
}

const PaymentGraph = ({
  data
}: PaymentGraphProps) => {
  


  return (
    <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
    <section className="flex items-start justify-start h-full">
      <figure className="w-10 h-10 rounded-full bg-lime-50 flex p-1 items-center justify-center">
        <MoneyIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
      </figure>
    </section>
    <section className="flex items-center justify-start h-full">
      <section className="flex flex-col items-start gap-1 h-full">
        <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">
          TOTAL PAYMENTS
        </label>
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">
          {data}
        </h1>
      </section>
    </section>
  </header>
  )
}

export default PaymentGraph
