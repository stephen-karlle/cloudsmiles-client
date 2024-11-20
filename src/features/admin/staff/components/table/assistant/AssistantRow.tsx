import { TableData, TableRow } from '@components/ui/DataTable';
import { useStaffStore } from '@features/admin/staff/stores/staff.store';
import { getStaffBadgeColor } from '@features/admin/staff/utils/staff.utils';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAssistant } from '@features/admin/staff/services/assistant.services';
import { AssistantResponseType } from '@features/admin/staff/types/assistant.types';
import { toast } from 'sonner';
import { isNew } from '@utils/date.utils';
import PopOver from '@components/ui/PopOver';
import DeleteIcon from '@icons/linear/DeleteIcon';
import EditIcon from '@icons/linear/EditIcon';
import Avatar from '@components/ui/Avatar';
import DeleteModal from '@components/ui/DeleteModal';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import Toast from '@components/ui/Toast';
import EditAssistantForm from '../../forms/EditAssistantForm';

interface IAssistantRow {
  assistant: AssistantResponseType;
  index: number;
  gridTemplate: string;
}

const AssistantRow = ({
  assistant,
  index,
  gridTemplate,
}: IAssistantRow ) => {

  const queryClient = useQueryClient();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { bgColor, textColor } = getStaffBadgeColor(assistant.assistantEmploymentType)
  const setSelectedAssistant = useStaffStore((state) => state.setSelectedAssistant)

  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const setMainSheet = useStaffStore((state) => state.setMainSheet)

  const handleEditAssistant = (assistant: AssistantResponseType) => {
    setSelectedAssistant(assistant)
    setStaffDrawerOpen(true)
    setMainSheet({ 
      name: "MainSheet1", 
      component: <EditAssistantForm /> 
    })
  }

  const mutation = useMutation({
    mutationFn: () => deleteAssistant(assistant._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['assistantsTableData']});
      toast.custom(() => (
        <Toast title={assistant.assistantFullName} message="has been deleted" subtitle={assistant.assistantCredentialId.credentialEmail} status="success"/>
      ),{duration:5000});    
    }
  })


  return (
    <TableRow 
      index={index}
      key={index}
      gridTemplateColumns={gridTemplate}   
    >
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Delete Assistant"
        message="This action cannot be undone. This will permanently delete your assistant from our servers."
        confirmation={`DELETE ${assistant.assistantFullName}`}
        handleSubmit={mutation.mutate}
        isLoading={mutation.isPending}
      />
      <TableData
        className="flex items-start gap-4 "
      >
        <Avatar 
          name={assistant.assistantFullName}
          src={assistant.assistantAvatar}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-700">
              {assistant.assistantFullName}
            </label>
            {isNew(assistant.createdAt) && 
              <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>
            }
          </div>
          <label className="text-sm text-gray-500 ">
            {assistant.assistantRole}
          </label>

        </div>

      </TableData>
      <TableData
        className=" flex flex-col items-start justify-center "
      >
        <label className="text-sm text-gray-700 w-full">
          {"(+63) " +assistant.assistantCredentialId.credentialPhoneNumber}
        </label>
        <label 
          className="text-sm text-gray-500 w-full underline underline-offset-2"
        >
          {(assistant.assistantCredentialId.credentialEmail).toLowerCase()}
        </label>
      </TableData>
      <TableData className="flex items-start justify-start gap-2">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']?.map((day, index) => {
          const schedule = assistant.assistantScheduleId?.schedules?.find((schedule) => schedule.day === day);
          const isWorking = !!schedule;
          return (
            <div key={index} className={`w-7 h-7 rounded-md ${isWorking ? "bg-lime-500 ": "  bg-gray-100 stripes-not-working"} flex-shrink-0 flex items-center justify-center `}>
              <p className={`text-sm ${isWorking ? "text-white ": "text-gray-500 "} `}>
                { day.charAt(0).toUpperCase()}
              </p>
            </div>
          );
        })}
      </TableData>
      <TableData
        className=" flex items-center justify-start "
      >
        <label className="text-sm text-gray-700 w-full break-all whitespace-nowrap truncate max-w-11/12 ">
          {assistant.assistantAddress}
        </label>
      </TableData>
      <TableData
        className=" flex items-center justify-start w-full"
      >
        <span
          className={`px-2 py-1 rounded-full text-xs uppercase`}
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {assistant.assistantEmploymentType}
        </span>
      </TableData>
      <TableData
        className="flex items-start gap-4 relative "
      >
        <button 
          ref={anchorRef}
          className=""
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
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
            onClick={()=>handleEditAssistant(assistant)}
          >
            <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            Edit
          </button>
          <hr className="border-gray-200 my-1" />
          <button 
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-rose-500 flex items-center gap-2"
            onClick={()=>setIsDeleteModalOpen(true)}
          >
            <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
            Delete
          </button>
        </PopOver>      
      </TableData>
    </TableRow>
  )
}

export default AssistantRow
