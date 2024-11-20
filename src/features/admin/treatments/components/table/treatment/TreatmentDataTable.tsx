import { Fragment } from 'react';
import { DataTable } from '@components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getTreatments } from '../../../services/treatment.services';
import { ITreatmentDataResponse } from '../../../types/treatment.types';
import TreatmentRow from './TreatmentRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';

const header = [
  {
    title: 'TREATMENT NAME',
    sortable: true,
  },
  {
    title: 'COST',
    sortable: false,
  },
  {
    title: 'ESTIMATE DURATION',
    sortable: false,
  },
  {
    title: 'TREATMENT TYPE',
    sortable: true,
  },
  {
    title: 'RATING',
    sortable: false,
  },
  {
    title: 'REVIEW',
    sortable: false,
  },
]

const TreatmentDataTable = () => {
  
  const { data, isLoading } = useQuery<ITreatmentDataResponse[]>(
    {
      queryKey: ['treatmentTableData'],
      queryFn: getTreatments,
    },
  );

  const gridTemplate = "25% 15% 15% 15% 15% 10% 5%"

  if (isLoading) return <TableDataSkeleton />

  return (
    <DataTable 
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
    >

    {data?.map((treatment, index) => (
      <Fragment key={index}>
        <TreatmentRow 
          treatment={treatment}
          index={index}
          gridTemplate={gridTemplate}
        />
      </Fragment>
    ))}
    
    </DataTable>
  )
}

export default TreatmentDataTable
