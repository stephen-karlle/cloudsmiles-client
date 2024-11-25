import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useRef, useState } from 'react';
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { TableData, TableRow } from '@components/ui/DataTable';
import { PatientResponseType } from '../../types/patient.types';
import { usePatientStore } from '../../stores/patient.store';
import { deletePatient } from '../../services/patient.services';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { isNew } from '@utils/date.utils';
import { useUserStore } from '@stores/user.store';
import { createActivity } from '@features/admin/activities/services/activity.services';
import EditIcon from '@icons/linear/EditIcon';
import PopOver from '@components/ui/PopOver';
import Avatar from '@components/ui/Avatar'
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import EditPatientForm from '../forms/EditPatientForm';
import DeleteModal from '@components/ui/DeleteModal';
import Toast from '@components/ui/Toast';
import DeleteIcon from '@icons/linear/DeleteIcon';
import CheckIcon from '@icons/linear/CheckIcon';


interface IPatientRow{
  patient: PatientResponseType;
  index: number;
  gridTemplate: string;
}

const PatientRow = ({
  patient,
  index,
  gridTemplate,
}: IPatientRow ) => {
  const user = useUserStore((state) => state.user)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const setSelectedPatient = usePatientStore((state) => state.setSelectedPatient)
  const setMainSheet = usePatientStore((state) => state.setMainSheet)
  const setPatientDrawerOpen = usePatientStore((state) => state.setPatientDrawerOpen)
  const setSelectedService = usePatientStore((state) => state.setSelectedService)
  const setCheckups = usePatientStore((state) => state.setCheckups)


  const handleEditPatient = (e: MouseEvent, patient: PatientResponseType) => {
    e.stopPropagation()
    setSelectedPatient(patient)
    setMainSheet({
      name: "MainSheet1",
      component: <EditPatientForm />
    })
    setPatientDrawerOpen(true)
  }

  const handleSelectPatient = () => {
    setSelectedService({ id: 0, name: "", type: "Tooth" })
    setCheckups([])
    queryClient.removeQueries({
      queryKey:["adminPatientProfile"]
    }) // Clear all queries
    navigate(`/patient/${patient._id}`)
  }

  const handleOpenPopover = (e: MouseEvent) => {
    e.stopPropagation()
    setIsPopoverOpen(!isPopoverOpen)
  }

  const handleDeletePatient = (e: MouseEvent) => {
    e.stopPropagation()
    setIsDeleteModalOpen(true)
  }

  
  const mutation = useMutation({
    mutationFn: () => deletePatient(patient._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['patientsTableData']});
      toast.custom(() => (
        <Toast title={patient.patientFullName} message="has been deleted" subtitle={patient.patientCredentialId.credentialEmail} status="success"/>
      ),{duration:5000});    
    }
  })

  const handleDelete = async () => {
    mutation.mutate()
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Patient ${patient.patientFullName} has been permanently removed.`,
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
      onRowClick={handleSelectPatient}
    >
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Delete Patient"
        message="This action cannot be undone. This will permanently delete your patient from our servers."
        confirmation={`DELETE ${patient.patientFullName}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <TableData
        className="flex items-start gap-4 "
      >
        <Avatar name={patient.patientFullName} src={patient.patientAvatar}/>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-700">
              {patient.patientFullName}
            </label>
            {isNew(patient.createdAt) && 
              <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>
            }
          </div>
          <label className="text-sm text-gray-500">
            #{patient.patientSerialId}
          </label>
        </div>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          {"(+63) " + patient.patientCredentialId.credentialPhoneNumber}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          {patient.patientCredentialId.credentialEmail}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          {patient.patientAddress}
        </label>
      </TableData>
      <TableData
        className="flex items-center gap-4 "
      >
        {patient.patientStatus === "Verified" && (
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center ml-3">
            <CheckIcon className="w-5 h-5 stroke-2 stroke-white" />
          </div>
        )}
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          {formatISODateWithStringWithSuffix(patient.createdAt)}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 relative"
      >
        <button 
          ref={anchorRef}
          className="w-12 h-10"
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
            onClick={(e)=>handleEditPatient(e, patient)}
          >
            <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            Edit
          </button>
          <hr className="border-gray-200 my-1" />
          <button 
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-rose-500 flex items-center gap-2"
            onClick={(e)=>handleDeletePatient(e)}
          >
            <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
            Delete
          </button>
        </PopOver>
      </TableData>
    </TableRow>
  )
}

export default PatientRow
