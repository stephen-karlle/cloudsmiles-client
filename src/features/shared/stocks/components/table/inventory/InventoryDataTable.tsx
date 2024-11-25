import { DataTable } from '@components/ui/DataTable';
import { Fragment } from 'react';
import { getProducts } from '@features/shared/stocks/services/product.services';
import { useQuery } from '@tanstack/react-query';
import { ProductResponseType } from '@features/shared/stocks/types/product.types';
import InventoryRow from './InventoryRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';

const header = [
  {
    title: 'NAME',
    sortable: true,
  },
  {
    title: 'vendor',
    sortable: false,
  },
  {
    title: 'CATEGORY',
    sortable: true,
  },
  {
    title: 'QUANTITY',
    sortable: false,
  },
  {
    title: 'STATUS',
    sortable: false,
  },
  {
    title: 'ASSET VALUE',
    sortable: false,
  },
]

type InventoryDataTableProps = {
  searchValue: string
}

const InventoryDataTable = ({
  searchValue
}: InventoryDataTableProps) => {

  const { data, isLoading } = useQuery({
    queryKey: ['productTableData'],
    queryFn: async () => {
      const response = await getProducts();
      return response as ProductResponseType[]
    },
  })
  
  if (isLoading) return <TableDataSkeleton />


  const gridTemplate = "auto 20% 15% 15% 15% 10% 5%"

  const filteredProducts = data?.filter(product => {
    return product.productName.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <DataTable 
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
    >
    {filteredProducts?.map((product, index) => (
      <Fragment key={index}>
        <InventoryRow 
          product={product}
          index={index}
          gridTemplate={gridTemplate}
        />
      </Fragment>
    ))}
    </DataTable>
  )
}

export default InventoryDataTable
