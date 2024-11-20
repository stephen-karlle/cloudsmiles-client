import { useQueryClient } from "@tanstack/react-query"
import { getPaymentStatus, getStatusStyle } from "../../utils/color.utils"
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils"
import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import { usePaymentStore } from "../../stores/payment.store"
import { Fragment } from "react"
import CloseIcon from "@icons/linear/CloseIcon"
import NotPaidStep from "../steps/NotPaidStep"
import PartiallyPaidStep from "../steps/PartiallyPaidStep"
import InformationIcon from "@icons/linear/InformationIcon"
import HistoryIcon from "@icons/linear/HistoryIcon"
import Seperator from "@components/ui/Seperator"
import Button from "@components/ui/Button"
import PartiallyPayWithCashCard from "../cards/PartiallyPayWithCashCard"
import usePayPartially from "../../hooks/usePayPartially"
import PaymentHistorySheet from "../sheets/PaymentHistorySheet"
import PartiallyPayWithEWallet from "../cards/PartiallyPayWithEWallet"
import PlusIcon from "@icons/linear/PlusIcon"



const ViewPaymentForm = () => {

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const methods = usePayPartially()
  
  const { handleSubmit, onSubmit, reset } = methods

  const closeCards = usePaymentStore((state) => state.closeCards)
  const cardStates = usePaymentStore((state) => state.cardStates)
  const payment = usePaymentStore((state) => state.selectedPayment)
  const closeDrawer = usePaymentStore((state) => state.closeDrawer)
  const setPaymentActiveSheets = usePaymentStore((state) => state.setPaymentActiveSheets)
  
  const patient = payment.paymentAppointmentId.appointmentPatientId
  
  const isFullyPaid = payment.paymentStatus === "paid"
  const isPartiallyPaid = payment.paymentStatus === "partial"
  const isNotPaid = payment.paymentStatus === "notPaid"

  const style = getStatusStyle(payment.paymentStatus)
  const status = getPaymentStatus(payment.paymentStatus)
  
  const hasOpenCards = Object.values(cardStates).some((state) => state);

  const handleClose = () => {
    const delay = hasOpenCards ? 280 : 0;    
    closeCards();
    setTimeout(() => {
      closeDrawer();
      setTimeout(() => {
        queryClient.removeQueries({ queryKey: ["paymentTreatmentCost"] });
      }, 280);
      reset();
    }, delay);
  };


  const handleAddTreatment = () => {
    navigate('/calendar')
    closeDrawer()
    queryClient.removeQueries({queryKey: ["paymentTreatmentCost"]})
  }

  const handleOpenHistory = () => { 
    const delay = hasOpenCards ? 280 : 0;
    closeCards();
    setTimeout(() => {
      setPaymentActiveSheets((prev) => [
        ...prev,
        {
          name: "ExtraSheet1", 
          component: <PaymentHistorySheet />
        }
      ]);
    }, delay);
  }



  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col h-full overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className=" w-full h-full overflow-hidden flex flex-col rounded-3xl bg-white z-30">
          <header className="flex justify-between px-6 py-4 gap-2 border-b border-gray-200">
            <div className="flex-1 flex items-center justify-start gap-2 ">
              <label className="text-gray-500">Payment ID</label>
              <h1 className="text-xl text-gray-700 font-medium">#{payment.paymentSerialId}</h1>
            </div>
            {(isPartiallyPaid || isFullyPaid) && (
              <Fragment>
                <Button 
                  variant="secondary"
                  onClick={handleOpenHistory}
                >
                  <HistoryIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                  History
                </Button>
                <Seperator className="ml-2" />
              </Fragment>
            )}
            <button className="w-8 h-8" type="button" onClick={handleClose}>
              <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
            </button>
          </header>
          <section 
            className="flex flex-col h-full w-full items-center justify-start gap-6 overflow-y-auto px-6"
            style={{scrollbarGutter: "stable"}}
          >
            <div className="flex flex-col w-full ">
              <div className="flex items-center justify-between w-full mt-4">
                <label className="text-xs text-gray-500 tracking-wider">PAYMENT TO</label>
                <label className="text-xs text-gray-500 tracking-wider">PAYMENT DATE</label>
              </div>
              <div className="flex items-center justify-between w-full">
                <label className="text-lg text-gray-700 font-medium">{patient.patientFullName}</label>
                <label className="text-sm text-gray-700 ">{ formatISODateWithStringWithSuffix(new Date())}</label>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-gray-700 max-w-[50%]">{patient.patientAddress}</p>
                <span className={`${style} px-2 py-1 rounded-full uppercase text-xs `}>
                  {status}
                </span>            
              </div>
            </div>
            {isNotPaid && <NotPaidStep />}
            {isPartiallyPaid && <PartiallyPaidStep />}
          </section>
        </article>
        {isPartiallyPaid && (
          <section className="w-full flex items-center justify-center gap-2 bg-white z-20 rounded-b-3xl h-20 p-4 border-t border-gray-200">
            <InformationIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
            <label className="text-gray-500 text-sm">Please select the payment method to add amount to the account balance.</label>
          </section>
        )}
        {isNotPaid && (
          <section className="w-full flex items-center justify-center gap-2 bg-white z-20 rounded-b-3xl h-20 p-4 border-t border-gray-200">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleAddTreatment}
            >
              <PlusIcon className="w-5 h-5 stroke-2 stroke-white" />
              Add Treatment
            </Button>
          </section>
        )}
        <PartiallyPayWithCashCard />
        <PartiallyPayWithEWallet method="GCash" finish={handleClose}/>
        <PartiallyPayWithEWallet method="PayMaya" finish={handleClose}/>
        <PartiallyPayWithEWallet method="BillEase" finish={handleClose}/>
        <PartiallyPayWithEWallet method="GrabPay" finish={handleClose}/>
      </form>
    </FormProvider>
  )
}

export default ViewPaymentForm