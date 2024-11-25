import { DataTable } from '@components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../../services/activity.services';
import { ActivityType } from '../../types/activity.types';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';
import ActivityRow from './ActivityRow';

const header = [
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

const ActivityDataTable = () => {
  
  const { data, isLoading } = useQuery<ActivityType[]>(
    {
      queryKey: ['activityTableData'],
      queryFn: getActivities,
    },
  );

  const gridTemplate = "20% auto 15% 15% 15%"

  if (isLoading) return <TableDataSkeleton />

  console.log(data)

  return (
    <DataTable 
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
    >
      {data?.map((activity, index) => (
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
