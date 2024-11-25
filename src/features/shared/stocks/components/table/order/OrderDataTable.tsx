import { DataTable } from '@components/ui/DataTable';
import { getOrders } from '../../../services/order.services';
import { useQuery } from '@tanstack/react-query';
import { OrderResponseType } from '../../../types/order.types';
import OrderRow from './OrderRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';

const header = [
  {
    title: 'ORDER',
    sortable: true,
  },
  {
    title: 'CREATED AT',
    sortable: false,
  },
  {
    title: 'vendor',
    sortable: true,
  },
  {
    title: 'STATUS',
    sortable: false,
  },
  {
    title: 'ITEM RECEIVED',
    sortable: false,
  },
  {
    title: 'SEND EMAIL',
    sortable: false,
  },
]

type OrderDataTableProps = {
  searchValue: string
}

const OrderDataTable = ({
  searchValue
}: OrderDataTableProps) => {

  const { data, isLoading } = useQuery({
    queryKey: ['ordersTableData'],
    queryFn: async () => {
      const response = await getOrders();
      return response as OrderResponseType[]
    },
  })

  if (isLoading) return <TableDataSkeleton />

  const gridTemplate = "auto 15% 20% 10% 15% 10% 10%"

  const filteredOrders = data?.filter(order => {
    return order.orderVendorId.vendorCompanyName.toLowerCase().includes(searchValue.toLowerCase())
  })



  return (
    <DataTable 
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
    >
      {filteredOrders?.map((order, index) => (
        <OrderRow 
          key={index}
          order={order}
          index={index}
          gridTemplate={gridTemplate}
        />
      ))}
    </DataTable>
  )
}

export default OrderDataTable
