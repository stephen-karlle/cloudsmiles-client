import { DataTable } from '@components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { ContextResponseType } from '../../../types/context.types';
import { Fragment } from 'react/jsx-runtime';
import { getContexts } from '../../../services/knowledge.services';
import ContextRow from './ContextRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';


const header = [
  {
    title: 'ID',
    sortable: true,
  },
  {
    title: 'NAME',
    sortable: false,
  },
  {
    title: 'CATEGORY',
    sortable: true,
  },
  {
    title: 'DATA',
    sortable: false,
  },
  {
    title: 'CREATED AT',
    sortable: false,
  },
]

type ContextDataTableProps = {
  searchValue: string
}

const ContextDataTable = ({
  searchValue
}: ContextDataTableProps) => {


  const { data: contexts, isLoading } = useQuery<ContextResponseType[]>(
    {
      queryKey: ['contextTableData'],
      queryFn: getContexts,
    },
  );


  if (isLoading) return <TableDataSkeleton />


  const gridTemplate = "10% 20% 15% auto 10% 5%"

  const filteredContexts = contexts?.filter((context) => {
    return (
      context.contextLabel.toLowerCase().includes(searchValue.toLowerCase()) ||
      context.contextCategory.toLowerCase().includes(searchValue.toLowerCase()) ||
      context.contextData.toLowerCase().includes(searchValue.toLowerCase())
    )
  })



  return (
    <DataTable
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
      currentPage={0}
      onPageChange={() => {}}
      totalPages={0}
    >
      {filteredContexts?.map((context, index) => (
        <Fragment 
          key={index}
        >
          <ContextRow 
            context={context}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default ContextDataTable 
