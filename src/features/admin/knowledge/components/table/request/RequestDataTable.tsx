import { DataTable } from '@components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '../../../services/knowledge.services';
import { RequestResponseType } from '../../../types/context.types';
import { Fragment } from 'react/jsx-runtime';
import RequestRow from './RequestRow';
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
    title: 'STATUS',
    sortable: true,
  },
  {
    title: 'CREATED AT',
    sortable: false,
  },
]

type RequestDataTableProps = {
  searchValue: string
}

const RequestDataTable= ({
  searchValue
}: RequestDataTableProps) => {


  const { data: requests, isLoading } = useQuery<RequestResponseType[]>(
    {
      queryKey: ['requestTableData'],
      queryFn: getRequests,
    },
  );



  if (isLoading) return <TableDataSkeleton />

  const gridTemplate = "10% auto 10% 10% 5%"


  const filteredRequests = requests?.filter((request) => {
    return (
      request.requestLabel.toString().includes(searchValue)
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

      {filteredRequests?.map((request, index) => (
        <Fragment 
          key={index}
        >
          <RequestRow 
            request={request}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default RequestDataTable
