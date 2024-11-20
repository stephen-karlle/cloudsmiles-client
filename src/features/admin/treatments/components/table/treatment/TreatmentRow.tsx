import { ITreatmentDataResponse, TreatmentRequestType } from '@features/admin/treatments/types/treatment.types';
import { useRef, useState } from 'react';
import { TableData, TableRow } from '@components/ui/DataTable';
import { deleteTreatment } from '@features/admin/treatments/services/treatment.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTreatmentStore } from '@features/admin/treatments/stores/treatment.store';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import DeleteIcon from '@icons/linear/DeleteIcon';
import EditIcon from '@icons/linear/EditIcon';
import PopOver from '@components/ui/PopOver';
import DeleteModal from '@components/ui/DeleteModal';
import Toast from '@components/ui/Toast';
import ClockIcon from '@icons/linear/ClockIcon';

interface IInventoryRow {
  treatment: ITreatmentDataResponse;
  index: number;
  gridTemplate: string;
}

const TreatmentRow = ({
  treatment,
  index,
  gridTemplate,
}: IInventoryRow ) => {
   
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient()
  const setDrawerOpen = useTreatmentStore((state) => state.setTreatmentDrawerOpen)
  const setSelectedTreatment = useTreatmentStore((state) => state.setSelectedTreatment)


  const mutation = useMutation({
    mutationFn: () => deleteTreatment(treatment._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['treatmentTableData']});
      toast.custom(() => (
        <Toast title={treatment.treatmentName} message="has been deleted" subtitle={treatment.treatmentCategory} status="success"/>
      ),{duration:5000});    }
  })

  const handleDelete = async () =>  {
    mutation.mutate()
  }

  const handlOpenEdit = () => {
    setDrawerOpen(true)



    setSelectedTreatment(treatment as unknown as TreatmentRequestType)
  }


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
        title="Delete Treatment"
        message="This action cannot be undone. This will permanently delete your treatment from our servers."
        confirmation={`DELETE ${treatment.treatmentName}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <TableData className="flex flex-col justify-center">
        <span className="w-full text-gray-700">{treatment.treatmentName}</span>
        <span className="w-full text-gray-500 text-sm">{"#" + treatment.treatmentSerialId}</span>
      </TableData>
      <TableData
        className="flex items-center justify-start"
      >
        {/* {treatment.treatmentChargeType !== "General" && <span className="text-gray-500 mr-2">Starts from</span>} */}
        <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
        {(treatment.treatmentCost).toLocaleString("en-US")}
        <span>
          {treatment.treatmentChargeType === 'Tooth' && "/tooth"}
          {treatment.treatmentChargeType === 'Section' && "/section"}
        </span>        
      </TableData>
      <TableData className="flex items-center justify-start gap-1 ">
        <ClockIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
        {" " + treatment.treatmentDuration + " "}hours
        </TableData>
      <TableData
        className=""
      > 
        <span
          className={`px-2 py-1 rounded-full text text-xs uppercase
            ${treatment.treatmentCategory === 'Cosmetic' && 'bg-purple-50 text-purple-500'}
            ${treatment.treatmentCategory === 'Medical' && 'bg-sky-50 text-sky-500'}
          `}
        >
          {treatment.treatmentCategory}
        </span>

      </TableData>
      <TableData>No Rating</TableData>
      <TableData>0 Reviews</TableData>


      <TableData
        className="flex items-center justify-end w-full h-full relative "
      >
        <button 
          ref={buttonRef}
          className=""
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
        >
          <ThreeDotsIcon className="w-5 h-5 stroke-2 stroke-gray-500 fill-gray-500 -rotate-90" />
        </button>
        <PopOver 
          anchorRef={buttonRef}
          isOpen={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}              
          className=" top-12 -right-0  py-2 flex flex-col h-fit"
          position='bottom'
        >
          <button 
            type="button"
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-gray-500 flex items-center gap-2"
            onClick={handlOpenEdit}
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

export default TreatmentRow
