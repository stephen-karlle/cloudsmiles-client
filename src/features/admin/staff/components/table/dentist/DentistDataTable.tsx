import { DataTable } from '@components/ui/DataTable';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IDentistResponse, } from '@features/admin/staff/types/dentists.types';
import { getDentists } from '@features/admin/staff/services/dentist.services';

import DentistRow from './DentistRow';
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
    title: 'SERVICES',
    sortable: true,
  },
  {
    title: 'EMPLOYMENT TYPE',
    sortable: false,
  },
]

type DentistDataTableProps = {
  searchValue: string
}

const DentistDataTable = ({
  searchValue
}: DentistDataTableProps) => {


  const { data, isLoading } = useQuery<IDentistResponse[]>(
    {
      queryKey: ['dentistsTableData'],
      queryFn: getDentists,
    },
  );


  if (isLoading) return <TableDataSkeleton />


  const gridTemplate = "20% 20% 25% 15% 15% 5%"

  const filteredDentists = data?.filter((dentist) => {
    return (
      dentist.dentistFullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      dentist.dentistCredentialId.credentialEmail.toLowerCase().includes(searchValue.toLowerCase()) ||
      dentist.dentistCredentialId.credentialPhoneNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      dentist.dentistAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
      dentist.dentistSpecialization.toLowerCase().includes(searchValue.toLowerCase()) 
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
      {filteredDentists?.map((dentist, index) => (
        <Fragment key={index}>
          <DentistRow 
            dentist={dentist}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default DentistDataTable
