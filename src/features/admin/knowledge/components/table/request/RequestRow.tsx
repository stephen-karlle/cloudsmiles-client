import { TableData, TableRow } from '@components/ui/DataTable';
import { RequestResponseType } from '../../../types/context.types';
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { useKnowledgeStore } from '../../../stores/knowledge.store';
import { useRef, useState } from 'react';
import DeleteIcon from '@icons/linear/DeleteIcon';
import EyeIcon from '@icons/linear/EyeIcon';
import PopOver from '@components/ui/PopOver';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import ReviewRequestForm from '../../forms/ReviewRequestForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Toast from '@components/ui/Toast';
import { deleteRequest } from '../../../services/knowledge.services';
import DeleteModal from '@components/ui/DeleteModal';


interface IRequestRow{
  request: RequestResponseType
  index: number;
  gridTemplate: string;
}

const RequestRow = ({
  request,
  index,
  gridTemplate,
}: IRequestRow ) => {

  const queryClient = useQueryClient()
  const [ isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const setSelectedRequest = useKnowledgeStore((state) => state.setSelectedRequest);
  const setMainSheet = useKnowledgeStore((state) => state.setMainSheet);
  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen);

  const handleEditContext = () => {
    setSelectedRequest(request)
    setKnowledgeDrawerOpen(true);
    setMainSheet({
      name: "MainSheet1",
      component: <ReviewRequestForm />
    })
  }

  const mutation = useMutation({
    mutationFn: () => deleteRequest(request._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['requestTableData']});
      toast.custom(() => (
        <Toast 
          title={request.requestLabel} 
          message="has been deleted" 
          subtitle={request.requestSerialId} 
          status="success"
        />
      ),{duration:5000});    
    }
  })

  const handleDelete = () => {
    mutation.mutate()
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
        title="Delete Request"
        message="This action cannot be undone. This will permanently delete your context from our servers."
        confirmation={`DELETE ${request.requestLabel}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          #{request.requestSerialId}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700 truncate">
          {request.requestLabel}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <span className="text-xs uppercase px-2 py-1 rounded-full bg-amber-50 text-amber-500 ">
          {request.requestStatus}
        </span>
      </TableData>

      <TableData className="flex items-start gap-4">
        <label className="text-sm text-gray-700">
          {formatISODateWithStringWithSuffix(request.createdAt)}
        </label>
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
            onClick={handleEditContext}
          >
            <EyeIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            View
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

export default RequestRow
