import { DataTable } from '@components/ui/DataTable';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAssistants } from '@features/admin/staff/services/assistant.services';
import { AssistantResponseType } from '@features/admin/staff/types/assistant.types';
import AssistantRow from './AssistantRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';

const header = [
  {
    title: 'NAME',
    sortable: true,
  },
  {
    title: 'CONTACT',
    sortable: false,
  },
  {
    title: 'WORKING DAYS',
    sortable: false,
  },
  {
    title: 'ADDRESS',
    sortable: false,
  },
  {
    title: 'EMPLOYMENT TYPE',
    sortable: false,
  },
]

type AssistantDataTableProps = {
  searchValue: string
}

const AssistantDataTable = ({
  searchValue
}: AssistantDataTableProps) => {


  const { data, isLoading } = useQuery<AssistantResponseType[]>(
    {
      queryKey: ['assistantsTableData'],
      queryFn: getAssistants,
    },
  );

  if (isLoading) return <TableDataSkeleton />

  const gridTemplate = "20% 20% 25% 15% 15% 5%"


  const filteredAssistants = data?.filter((assistant) => {
    return (
      assistant.assistantFullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      assistant.assistantAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
      assistant.assistantCredentialId.credentialEmail.toLowerCase().includes(searchValue.toLowerCase()) ||
      assistant.assistantCredentialId.credentialPhoneNumber.toLowerCase().includes(searchValue.toLowerCase()) || 
      assistant.assistantRole.toLowerCase().includes(searchValue.toLowerCase())
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
      {filteredAssistants?.map((assistant, index) => (
        <Fragment key={index}>
          <AssistantRow 
            assistant={assistant}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default AssistantDataTable
