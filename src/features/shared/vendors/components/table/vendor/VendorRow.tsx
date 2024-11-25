import { useRef, useState, MouseEvent} from 'react';
import { TableData, TableRow } from '@components/ui/DataTable';
import { VendorResponseType } from '@features/shared/vendors/types/vendor.types';
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { isNew } from '@utils/date.utils';
import { useDrawerStore } from '@stores/drawer.store';
import { useVendorStore } from '@features/shared/vendors/stores/vendor.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVendor } from '@features/shared/vendors/services/vendor.services';
import { createActivity } from '@features/admin/activities/services/activity.services';
import { useUserStore } from '@stores/user.store';
import { toast } from 'sonner';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import PopOver from '@components/ui/PopOver';
import EditIcon from '@icons/linear/EditIcon';
import Avatar from '@components/ui/Avatar';
import Drawer from '@components/ui/Drawer';
import EditVendorForm from '../../forms/EditVendorForm';
import DeleteModal from '@components/ui/DeleteModal';
import Toast from '@components/ui/Toast';
import DeleteIcon from '@icons/linear/DeleteIcon';

type VendorRowProps = {
  vendor: VendorResponseType;
  index: number;
  gridTemplate: string;
}

const VendorRow = ({
  vendor,
  index,
  gridTemplate,
}: VendorRowProps ) => {
   
  const user = useUserStore((state) => state.user)
  const queryClient = useQueryClient()
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false);
  const isDrawerOpen = useDrawerStore((state) => state.drawerStates[vendor.vendorSerialId])
  const toggleDrawer = useDrawerStore((state) => state.toggleDrawer)
  const setSelectedVendor = useVendorStore((state) => state.setSelectedVendor)

  const mutation = useMutation({
    mutationFn: () => deleteVendor(vendor._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['vendorTableData']});
      toast.custom(() => (
        <Toast title={vendor.vendorCompanyName} message="has been deleted" subtitle={vendor.vendorEmail} status="success"/>
      ),{duration:5000});    }
  })

  const handleOpenPopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  }

  const handleEditVendor = ( e: MouseEvent, vendor: VendorResponseType ) => {
    e.preventDefault();
    setSelectedVendor(vendor);
    toggleDrawer(vendor.vendorSerialId);
  }

  const handleDelete = async () => {
    mutation.mutate();
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Vendor ${vendor.vendorCompanyName} has been permanently removed.`,
        activityAction: "Delete",
      })
    }
  }
  

  return (
    <TableRow 
      index={index}
      key={index}
      gridTemplateColumns={gridTemplate}
      className=""
    >
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Delete Vendor"
        message="This action cannot be undone. This will permanently delete your vendor from our servers."
        confirmation={`DELETE ${vendor.vendorCompanyName}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <Drawer
        activeSheets={[]}
        mainSheet={{
          name: `EditVendorDrawer-${vendor.vendorSerialId}`,
          component: <EditVendorForm />,
        }}
        isOpen={isDrawerOpen}
      />
      <TableData
        className="flex items-start gap-4 "
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">
              {vendor.vendorCompanyName}
            </label>
            {isNew(vendor.createdAt) && 
              <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>
            }
          </div>
          <label className="text-sm text-gray-500 font-normal">
            #{vendor.vendorSerialId}
          </label>
        </div>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <Avatar 
          name={vendor.vendorContactPerson} 
          src={vendor.vendorAvatar}
        />
        <div className="flex flex-col">
          <label className="text-sm text-gray-700">
            {vendor.vendorContactPerson}
          </label>
        </div>
      </TableData>
      <TableData
        className=""
      >
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-700">
            {"(+63) " + vendor.vendorPhoneNumber}
          </label>
          <label className="text-sm text-gray-500 underline underline-offset-2">
            {vendor.vendorEmail}
          </label>
        </div>
      </TableData>
      <TableData
        className="flex items-center justify-start gap-2 "
      >
        <label className="text-sm text-gray-700 w-full text-start">
          {vendor.vendorAddress}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <span className={`
          text-xs uppercase px-2 py-1 rounded-full
          ${vendor.vendorType === 'Manufacturer' && 'text-rose-500 bg-rose-50'}
          ${vendor.vendorType === 'Distributor' && 'text-amber-500 bg-amber-50'}
          ${vendor.vendorType === 'Supplier' && 'text-purple-500 bg-purple-50'}
        `}>{vendor.vendorType}</span>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          {formatISODateWithStringWithSuffix(vendor.createdAt)}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 relative"
      >
        <button 
          ref={anchorRef}
          className=""
          onClick={handleOpenPopover}
        >
          <ThreeDotsIcon className="w-5 h-5 stroke-2 stroke-gray-500 fill-gray-500 -rotate-90" />
        </button>
        <PopOver 
          anchorRef={anchorRef}
          isOpen={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}              
          className=" top-12 right-8  py-2 flex flex-col h-fit"
          position='bottom'
        >
          <button 
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-gray-500 flex items-center gap-2"
            onClick={(e)=>handleEditVendor(e, vendor)}
          >
            <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            Edit
          </button>
          <hr className="border-gray-200 my-1" />
          <button 
            onClick={()=>setIsDeleteModalOpen(true)}
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-rose-500 flex items-center gap-2"
          >
            <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
            Delete
          </button>
        </PopOver>
      </TableData>
    </TableRow>
  )
}

export default VendorRow
