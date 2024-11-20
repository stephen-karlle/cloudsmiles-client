import { PaymentAnalyticsType } from "../../types/payment.types";
import PlusIcon from "@icons/linear/PlusIcon";
import MoneyIcon from "@icons/linear/MoneyIcon";
import DownTrendIcon from "@icons/linear/DownTrendIcon";
import UpTrendIcon from "@icons/linear/UpTrendIcon";
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon";

type PaymentGraphProps = {
  data: PaymentAnalyticsType
}

const PaymentGraph = ({
  data
}: PaymentGraphProps) => {
  


  const revenue = data?.revenue.value || 0
  const isRevenueIncreasing = data?.revenue.isUpTrend || false
  const revenuePercentage = data?.revenue.percentage || 0

  return (
    <article
     className="h-full w-full flex items-center justify-start gap-4 p-6 "
    >
      <section className="flex items-start justify-start h-full">
        <figure className="w-10 h-10 rounded-full bg-gray-100 flex p-1 items-center justify-center">
          <figure className=" rounded-full p-1 flex items-center justify-center">
            <MoneyIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
          </figure>
        </figure>
      </section>
      <section className="flex flex-col items-start gap-1 h-full">
        <label className="text-xs font-medium tracking-wide text-gray-500">REVENUE THIS MONTH</label>
        <div className="flex items-center justify-center">
          <PhilippinePesoIcon className="stroke-2 stroke-gray-900 w-8 h-8" />
          <div
            className="flex items-center gap-2"
          >
            <h1 className="text-3xl font-medium tracking-tight text-gray-900">{(revenue).toLocaleString('en-US')}</h1>
            {isRevenueIncreasing ? (
              <div className="flex items-center justify-center px-2 py-1 bg-green-50 rounded-full">
                <UpTrendIcon className="w-4 h-4 stroke-2 stroke-green-500" /> 
                <p className="text-xs tracking-wide text-green-500 flex items-center ml-1">
                  {revenuePercentage}
                  <PlusIcon className="w-3 h-3 stroke-2 stroke-green-500" />
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center px-2 py-1 bg-rose-50 rounded-full">
                <DownTrendIcon className="w-5 h-5 stroke-2 stroke-red-500" />
                <p className="text-xs tracking-wide text-red-500 flex items-center ml-1">
                  {revenuePercentage}
                  <PlusIcon className="w-3 h-3 stroke-2 stroke-red-500" />
                </p>                
              </div>
            )} 
          </div>
        </div>
      </section>

    </article>
  )
}

export default PaymentGraph