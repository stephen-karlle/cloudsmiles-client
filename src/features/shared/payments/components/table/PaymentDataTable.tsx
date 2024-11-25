import { DataTable } from '@components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { PaymentResponseType } from '../../types/payment.types';
import { getPayments } from '../../services/payment.services';
import { Fragment } from 'react/jsx-runtime';
import PaymentRow from './PaymentRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';



const header = [
  {
    title: 'APPOINTMENT ID',
    sortable: false,
  },
  {
    title: 'PATIENT NAME',
    sortable: false,
  },
  {
    title: 'PAYMENT ID',
    sortable: false,
  },
  {
    title: 'APPOINTMENT DATE',
    sortable: false,
  },
  {
    title: 'TOTAL COST',
    sortable: false,
  },
  {
    title: 'STATUS',
    sortable: false,
  },
]

type PaymentDataTableProps = {
  searchValue: string
}

const PaymentDataTable = ({
  searchValue
}: PaymentDataTableProps) => {


  const { data, isLoading } = useQuery<PaymentResponseType[]>(
    {
      queryKey: ['paymentTableData'],
      queryFn: getPayments,
    },
  );


  if (isLoading) return <TableDataSkeleton />


  const gridTemplate = "15% 20% 15% 15% 15% 10% auto"


  const filteredPayments = data?.filter(payment => {
    return (
      payment.paymentAppointmentId.appointmentPatientId.patientFullName.toLowerCase().includes(searchValue.toLowerCase())|| 
      payment.paymentAppointmentId.appointmentPatientId.patientAddress.toString().includes(searchValue.toLowerCase()) ||
      payment.paymentAppointmentId.appointmentPatientId.patientSerialId.toString().includes(searchValue.toLowerCase())
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
      {filteredPayments?.map((payment, index) => (
        <Fragment key={index}>
          <PaymentRow 
            payment={payment}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default PaymentDataTable
