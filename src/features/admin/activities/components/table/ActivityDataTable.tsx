import { DataTable } from '@components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../../services/activity.services';
import { ActivityType } from '../../types/activity.types';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';
import ActivityRow from './ActivityRow';

const header = [
  {
    title: 'ID',
    sortable: true,
  },
  {
    title: 'ASSISTANT',
    sortable: true,
  },
  {
    title: 'DESCRIPTION',
    sortable: false,
  },
  {
    title: 'ACTION',
    sortable: false,
  },
  {
    title: 'TIME',
    sortable: false,
  },
  {
    title: 'DATE',
    sortable: false,
  },
]

type ActivityDataTableProps = ({
  searchValue: string
})

const ActivityDataTable = ({
  searchValue 
}:ActivityDataTableProps) => {
  
  const { data, isLoading } = useQuery<ActivityType[]>(
    {
      queryKey: ['activityTableData'],
      queryFn: getActivities,
    },
  );

  const gridTemplate = "10% 20% auto 10% 15% 15%"

  if (isLoading) return <TableDataSkeleton />

  const filteredData = data?.filter(activity => {
    return (
      activity.activityAssistantId.assistantFullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      activity.activityDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
      activity.activityAssistantId.assistantFullName.includes(searchValue) ||
      activity.activityAssistantId.assistantAddress.includes(searchValue)
    )
  })

  return (
    <DataTable 
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
    >
      {filteredData?.map((activity, index) => (
        <ActivityRow 
          key={index}
          activity={activity}
          index={index}
          gridTemplate={gridTemplate}
        />
      ))} 
    </DataTable>
  )
}

export default ActivityDataTable
