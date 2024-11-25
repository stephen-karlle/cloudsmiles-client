import { DataTable } from '@components/ui/DataTable';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPatients } from '../../services/patient.services';
import { PatientResponseType } from '../../types/patient.types';

import PatientRow from './PatientRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';

const header = [
  {
    title: 'PATIENT NAME',
    sortable: true,
  },
  {
    title: 'PHONE',
    sortable: false,
  },
  {
    title: 'EMAIL',
    sortable: false,
  },
  {
    title: 'ADDRESS',
    sortable: true,
  },
  {
    title: 'VERIFIED',
    sortable: false,
  },
  {
    title: 'REGISTERED',
    sortable: false,
  },
]

type PatientDataTableProps = {
  searchValue: string
}

const PatientDataTable = ({
  searchValue
}: PatientDataTableProps) => {


  const { data: patients, isLoading } = useQuery<PatientResponseType[]>(
    {
      queryKey: ['patientsTableData'],
      queryFn: getPatients,
    },
  );


  if (isLoading) return <TableDataSkeleton />
  

  const gridTemplate = "20% 15% 20% auto 10% 10% 5%"


  const filteredPatients = patients?.filter((patient) => {
    return (
      patient.patientFullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.patientCredentialId.credentialEmail.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.patientCredentialId.credentialPhoneNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.patientAddress.toLowerCase().includes(searchValue.toLowerCase())
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
      {filteredPatients?.map((patient, index) => (
        <Fragment key={index}>
          <PatientRow 
            patient={patient}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default PatientDataTable
