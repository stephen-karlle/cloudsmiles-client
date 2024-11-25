import { TableData, TableRow } from '@components/ui/DataTable';
import { useKnowledgeStore } from '../../../stores/knowledge.store';
import { ContextResponseType } from '../../../types/context.types';
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { useRef, useState } from 'react';
import { getCategoryStyle } from '../../utils/knowledge.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContext } from '../../../services/knowledge.services';
import { toast } from 'sonner';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import DeleteIcon from '@icons/linear/DeleteIcon';
import EditIcon from '@icons/linear/EditIcon';
import PopOver from '@components/ui/PopOver';
import EditContextForm from '../../forms/EditContextForm';
import DeleteModal from '@components/ui/DeleteModal';
import Toast from '@components/ui/Toast';


interface IContextRow{
  context: ContextResponseType;
  index: number;
  gridTemplate: string;
}

const ContextRow = ({
  context,
  index,
  gridTemplate,
}: IContextRow ) => {


  const queryClient = useQueryClient()
  const [ isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const setMainSheet = useKnowledgeStore((state) => state.setMainSheet);
  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen);
  const setSelectedContext = useKnowledgeStore((state) => state.setSelectedContext);

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleEditContext = ( context: ContextResponseType ) => {
    setSelectedContext(context)
    setKnowledgeDrawerOpen(true);
    setMainSheet({
      name: "MainSheet1",
      component: <EditContextForm />
    });
  }


  const mutation = useMutation({
    mutationFn: () => deleteContext(context._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['contextTableData']});
      toast.custom(() => (
        <Toast title={context.contextLabel} message="has been deleted" subtitle={context.contextSerialId} status="success"/>
      ),{duration:5000});    
    }
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  const badgeStyle = getCategoryStyle(context.contextCategory)


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
        title="Delete Context"
        message="This action cannot be undone. This will permanently delete your context from our servers."
        confirmation={`DELETE ${context.contextLabel}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          #{context.contextSerialId}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700 truncate">
          {context.contextLabel}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className={`${badgeStyle} text-xs uppercase px-2 rounded-full py-1`}>
          {context.contextCategory}
        </label>
      </TableData>
      <TableData className="flex items-start gap-4">
        <label className="text-sm text-gray-500 line-clamp-2 max-w-[90%]">
          {context.contextData}
        </label>
      </TableData>


      <TableData className="flex items-start gap-4">
        <label className="text-sm text-gray-700">
          {formatISODateWithStringWithSuffix(context.createdAt)}
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
            onClick={()=>handleEditContext(context)}
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

export default ContextRow
