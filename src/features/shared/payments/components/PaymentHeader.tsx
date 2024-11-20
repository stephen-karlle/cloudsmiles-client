import { useQuery } from '@tanstack/react-query'
import { getMonthlyRevenue } from '../services/payment.services'
import LinkButton from '@components/shared/LinkButton'
import PaymentGraph from './graphs/PaymentGraph'
import TableHeaderSkeleton from '@components/shared/skeletons/TableHeaderSkeleton'
import Button from '@components/ui/Button'
import FilterLinesIcon from '@icons/linear/FilterLinesIcon'

const PaymentHeader = () => {

  const { data, isLoading } = useQuery(
    {
      queryKey: ['paymentsHeaderData'],
      queryFn: getMonthlyRevenue,
    }
  );

  return (
    isLoading ? (
      <TableHeaderSkeleton />
    ) : (
      <section
        className="h-fit w-full flex flex-col bg-white "
      >            
        <header className="h-24 w-full flex items-center justify-start gap-4">
          <PaymentGraph data={data} />
        </header>
        <header className="w-8 flex gap-8 items-center justify-start h-auto px-6 ">
          <LinkButton 
            onClick={() => {}}
            isActive={true} 
            >
            Payments
          </LinkButton>
        </header>
        <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
          <Button variant="secondary" className="gap-2">
            <FilterLinesIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            Filters
          </Button>
        </header>
      </section>
    )
  )
}

export default PaymentHeader
