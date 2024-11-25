import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { TableData, TableRow } from '@components/ui/DataTable';
import { PaymentResponseType } from '../../types/payment.types';
import { useRef, useState } from 'react';
import { usePaymentStore } from '../../stores/payment.store';
import { getPaymentStatus, getStatusStyle } from '../../utils/color.utils';
import { useQueryClient } from '@tanstack/react-query';
import { cancelBill } from '../../services/payment.services';
import { getSelectedPaymentMethod } from '../../constants/payment.constants';
import { isNew } from '@utils/date.utils';
import { createActivity } from '@features/admin/activities/services/activity.services';
import { useUserStore } from '@stores/user.store';
import Avatar from '@components/ui/Avatar'
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import PopOver from '@components/ui/PopOver';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import EditIcon from '@icons/linear/EditIcon';
import Drawer from '@components/ui/Drawer';
import ViewPaymentForm from '../forms/ViewPaymentForm';
import DeleteModal from '@components/ui/DeleteModal';

interface IPatientRow{
  payment: PaymentResponseType;
  index: number;
  gridTemplate: string;
}


const PaymentRow = ({
  payment,
  index,
  gridTemplate,
}: IPatientRow ) => {

  console.log(payment)
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const isPaymentDrawerOpen = usePaymentStore((state) => state.drawerStates[payment.paymentSerialId] || false);
  const toggleDrawer = usePaymentStore((state) => state.toggleDrawer);
  const paymentActiveSheets = usePaymentStore((state) => state.paymentActiveSheets);
  const setSelectedPayment = usePaymentStore((state) => state.setSelectedPayment);
  const paymentMainSheet = usePaymentStore((state) => state.paymentMainSheet);
  const setPaymentMainSheet = usePaymentStore((state) => state.setPaymentMainSheet);
  const isPaymentModalOpen = usePaymentStore((state) => state.modalStates[payment.paymentSerialId] || false);
  const toggleModal = usePaymentStore((state) => state.toggleModal);
  const closeModal = usePaymentStore((state) => state.closeModal);
  const clearPaymentSteps = usePaymentStore((state) => state.clearPaymentSteps);
  const cardStates = usePaymentStore((state) => state.cardStates);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const patient = payment.paymentAppointmentId.appointmentPatientId
  const appointment = payment.paymentAppointmentId
  const totalAmount = payment.paymentTotalCost

  const style = getStatusStyle(payment.paymentStatus)
  const status = getPaymentStatus(payment.paymentStatus)

  const handleViewPayment = () => {
    toggleDrawer(payment.paymentSerialId);
    setSelectedPayment(payment)
    setPaymentMainSheet({
      name: 'View Payment',
      component: <ViewPaymentForm />,
    })
  }


  
  
  const handleCancelPayment = async () => {
    
    const selectedPaymentMethod = getSelectedPaymentMethod(cardStates);
    setIsLoading(true);

    try {
      if (user.role === "assistant") {
        await createActivity({
          activityAssistantId: user._id,
          activityDescription: `Bill for Payment ${payment.paymentSerialId} has been cancelled.`,
          activityAction: "Delete",
        })
      }
      await cancelBill(appointment._id ,selectedPaymentMethod);
      queryClient.invalidateQueries({queryKey: ['paymentQrCode']});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    closeModal();
    clearPaymentSteps();
  }
  
  return (
    <TableRow 
      index={index}
      key={index}
      gridTemplateColumns={gridTemplate}
      className=""
    >
      <DeleteModal
        isOpen={isPaymentModalOpen}
        setIsOpen={() => toggleModal(payment.paymentSerialId)}
        title="Cancel Payment"
        message="Are you sure you want to cancel this payment? The payment will be deleted permanently from the system."
        confirmation="I understand the consequences"
        handleSubmit={handleCancelPayment}
        deleteMessage="CANCEL"
        isLoading={isLoading}
      />
      <Drawer 
        isOpen={isPaymentDrawerOpen}
        activeSheets={paymentActiveSheets}
        mainSheet={paymentMainSheet}
      />
      <TableData
        className="flex items-start gap-2 "
      >
        <label className="text-sm text-gray-700">
        #{appointment.appointmentSerialId}
        </label>
        {isNew(payment.createdAt) && 
          <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>
        }
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <Avatar name={patient.patientFullName} src={patient.patientAvatar} />
        <div className="flex flex-col">
          <label className="text-sm text-gray-700">
            {patient.patientFullName}
          </label>
        </div>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
          #{payment.paymentSerialId}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm text-gray-700">
        {formatISODateWithStringWithSuffix(payment.createdAt)}

        </label>
      </TableData>

      <TableData
        className="flex items-start gap-4 "
      >
        <label className="text-sm flex items-center text-gray-700">
          {totalAmount ? (
            <>
              <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
              <span>{(payment.paymentTotalCost).toLocaleString('en-US')}</span>
            </>
          ) : (
            "To be determined"
          )}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 "
      >
        <span className={`${style} px-2 py-1 rounded-full uppercase text-xs `}>
          {status}
        </span>
      </TableData>
      <TableData
        className="flex justify-end gap-4 relative"
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
          className=" top-12 -right-0 w-28 py-2 flex flex-col h-fit"
          position='bottom'
        >
          <button 
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-base text-start text-gray-700 flex items-center gap-2"
            onClick={handleViewPayment}
          >
            <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            Edit
          </button>
        </PopOver>
      </TableData>
    </TableRow>
  )
}

export default PaymentRow

