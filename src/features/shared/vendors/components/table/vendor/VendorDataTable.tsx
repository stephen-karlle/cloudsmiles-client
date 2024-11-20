import { DataTable } from '@components/ui/DataTable';
import { Fragment,  } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVendors } from '@features/shared/vendors/services/vendor.services';
import { VendorResponseType } from '@features/shared/vendors/types/vendor.types';
import VendorRow from './VendorRow';
import TableDataSkeleton from '@components/shared/skeletons/TableDataSkeleton';

const header = [
  {
    title: 'VENDOR NAME',
    sortable: true,
  },
  {
    title: 'CONTACT PERSON',
    sortable: false,
  },
  {
    title: 'CONTACT',
    sortable: false,
  },
  {
    title: 'ADDRESS',
    sortable: true,
  },
  {
    title: 'TYPE',
    sortable: false,
  },
  {
    title: 'REGISTERED',
    sortable: false,
  },
]

const VendorDataTable = () => {


  const { data: vendors, isLoading } = useQuery<VendorResponseType[]>(
    {
      queryKey: ['vendorTableData'],
      queryFn: getVendors,
    },
  );


  if (isLoading) return <TableDataSkeleton />

  const gridTemplate = "15% auto 20% 15% 15% 10% 5%"

  return (
    <DataTable
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
    >
      {vendors?.map((vendor, index) => (
        <Fragment key={index}>
          <VendorRow 
            vendor={vendor}
            index={index}
            gridTemplate={gridTemplate}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default VendorDataTable
