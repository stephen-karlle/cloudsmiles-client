import { toast } from "sonner"
import { usePaymentAppointmentStore, useViewAppointmentStore } from '@features/shared/calendar/stores/appointment.stores';
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { Controller, useFormContext } from 'react-hook-form';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { useQueryClient } from '@tanstack/react-query';
import { paymentLogoMap } from "@features/shared/payments/constants/payment.constants";

import PayWithEWallet from '../../cards/PayWithEWallet';
import ChevronIcon from '@icons/linear/ChevronIcon';
import TextArea from '@components/ui/TextArea';
import ShieldIcon from '@icons/linear/ShieldIcon';
import CloseIcon from '@icons/linear/CloseIcon';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import Toast from '@components/ui/Toast';
import ToothTreatmentsAccordion from '../../accordions/ToothTreatmentsAccordion';
import SectionTreatmentsAccordion from '../../accordions/SectionTreatmentsAccordion';
import GeneralTreatmentsAccordion from '../../accordions/GeneralTreatmentsAccordion';
import PayWithCashCard from '../../cards/PayWithCashCard';
import MoneyIcon from '@icons/linear/MoneyIcon';


type PaymentStepType = {
  handleClose: () => void
}


const PaymentStep = ({ handleClose } : PaymentStepType ) => {

  const queryClient = useQueryClient()
  const { control, setValue, clearErrors, reset} = useFormContext()

  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment)
  const treatmentCost = usePaymentAppointmentStore((state) => state.treatmentCost)
  const clearViewActiveSheets = useViewAppointmentStore((state) => state.clearViewActiveSheets)
  const setViewMainSheet = useViewAppointmentStore((state) => state.setViewMainSheet)
  const setPaymentDrawerOpen = usePaymentAppointmentStore((state) => state.setPaymentDrawerOpen)
  const updateAppointments = useCalendarStore((state) => state.updateAppointments)
  const resetSelectedAppointment = useViewAppointmentStore((state) => state.resetSelectedAppointment)


  const toothTreatments = treatmentCost?.tooth ? treatmentCost.tooth : []
  const sectionTreatments = treatmentCost?.section ? treatmentCost.section : []

  const toothTreatmentsTotalCost = toothTreatments.map((treatment) => treatment.treatmentCost * (treatment?.tooths?.length ? treatment?.tooths?.length : 1)).reduce((acc, cost) => acc + cost, 0)
  const sectionTreatmentTotalCost = sectionTreatments.map((treatment) => treatment.treatmentCost * (treatment?.sections?.length ? treatment?.sections?.length : 1)).reduce((acc, cost) => acc + cost, 0)
  const generalTreatmentTotalCost = treatmentCost?.general ? treatmentCost.general.map((general) => general.treatmentCost).reduce((acc, cost) => acc + cost, 0) : 0

  const totalCost = toothTreatmentsTotalCost + sectionTreatmentTotalCost + generalTreatmentTotalCost
  const taxInPhilippines = 0
  const toggleCard = usePaymentAppointmentStore((state) => state.toggleCard)
  const closeCards = usePaymentAppointmentStore((state) => state.closeCards)
  const clearPaymentSteps = usePaymentAppointmentStore((state) => state.clearPaymentSteps)
  const setPaymentStep = usePaymentAppointmentStore((state) => state.setPaymentStep)

  const patient = selectedAppointment.patientData
  const appointment = selectedAppointment.appointmentData



  const handleOpenPayment = (method: string) => {
    clearErrors("")
    setValue("paymentMethod", method)
    setValue("paymentTotalCost", totalCost)
    setValue("paymentType", "")
    setPaymentStep(method, 1)
    toggleCard(method)
  }

  const cardStates = usePaymentAppointmentStore((state) => state.cardStates)
  const hasOpenCards = Object.values(cardStates).some((state) => state);

  const finish = () => {
    const delay = hasOpenCards ? 300 : 0;    

    closeCards();
    updateAppointments((prev) => {
      return prev.map((appointment) => {
        if(appointment.appointmentData._id === selectedAppointment?.appointmentData._id){
          return {
            ...appointment,
            appointmentData: {
              ...appointment.appointmentData,
              appointmentStatus: "Finished"
            }
          }
        }
        return appointment
      })
    })
    queryClient.invalidateQueries({queryKey: ["paymentTableData"]})
    queryClient.invalidateQueries({queryKey: ["paymentQrCode"]})
    queryClient.invalidateQueries({queryKey: ["appointmentTreatmentCost"]})
    toast.custom(() => (
      <Toast title={patient.patientFullName} message="has been paid successfully" subtitle={appointment.appointmentSerialId} status="success" />
    ), { duration: 5000 })
    
    setTimeout(() => {
      setViewMainSheet({ name: "MainSheet1", component: null })
      setPaymentDrawerOpen(false);
      clearPaymentSteps()
      clearViewActiveSheets()
      resetSelectedAppointment()
      reset()
    }, delay);
  }



  return (
    <main
      className="w-full h-full overflow-hidden flex flex-col "
    >
      <article className=" w-full h-full overflow-hidden flex flex-col rounded-t-3xl bg-white z-30">
        <section className="flex justify-between px-6 py-4 gap-2 border-b border-gray-200">
          <div className="flex-1 flex items-center justify-start gap-2 ">
            <label className="text-gray-500">Payment ID</label>
            <h1 className="text-xl text-gray-700 font-medium">#{selectedAppointment?.paymentData.paymentSerialId}</h1>
          </div>
          <button className="w-8 h-8" type="button" onClick={handleClose}>
            <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
          </button>
        </section>
        <section 
          className="flex flex-col h-full w-full items-center justify-start gap-6 overflow-y-auto px-6"
          style={{scrollbarGutter: "stable"}}
        >
          <section className="flex flex-col w-full ">
            <div className="flex items-center justify-between w-full mt-4">
              <label className="text-xs text-gray-500 tracking-wider">PAYMENT TO</label>
              <label className="text-xs text-gray-500 tracking-wider">PAYMENT DATE</label>
            </div>
            <div className="flex items-center justify-between w-full">
              <label className="text-lg text-gray-700 font-medium">{selectedAppointment?.patientData.patientFullName}</label>
              <label className="text-sm text-gray-700 ">{ formatISODateWithStringWithSuffix(new Date())}</label>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-700 max-w-[50%]">{selectedAppointment?.patientData.patientAddress}</p>
              <div className="text-xs text-rose-500 bg-rose-50 py-1 px-2 rounded-full">NOT PAID</div>
            </div>
          </section>
          <section className="relative flex flex-col items-center justify-center rounded-md ring-1 ring-gray-200 w-full">
            <div className="border-b bg-gray-100 border-gray-200 w-full grid grid-cols-[auto_30%] px-4 py-2">
              <label className="text-xs text-gray-500 tracking-wider">TREATMENT CATEGORY</label>
              <label className="text-xs text-gray-500 tracking-wider text-end">SUB TOTAL</label>
            </div>
            <ToothTreatmentsAccordion treatmentCost={treatmentCost}/>
            <hr className="border-t border-gray-200 w-full" />
            <SectionTreatmentsAccordion treatmentCost={treatmentCost}/>
            <hr className="border-t border-gray-200 w-full" />
            <GeneralTreatmentsAccordion treatmentCost={treatmentCost}/>

          </section>
          <section className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700">Add Note
              <span className="ml-1 text-gray-500">(Optional)</span>
            </label>
            <Controller
              name="paymentNotes"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextArea
                  value={value}
                  onChange={onChange}
                  placeholder="Add note..."
                  className="w-full"
                />
              )}
            />
          </section>
          <section className="flex flex-col w-full gap-2">

            <div className="flex w-full items-center justify-between">
              <label className="text-gray-500 text-base">Tax</label>
              <div className="flex items-center justify-center">
                <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
                <label className="text-gray-700 text-base font-medium ">
                  {taxInPhilippines.toLocaleString("en-US")}
                </label>
              </div>          
            </div>
            <div className="flex w-full items-center justify-between">
              <label className="text-gray-700 text-base font-medium">Total Cost</label>
              <div className="flex items-center justify-center">
                <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
                <label className="text-gray-700 text-base font-medium ">
                  {(totalCost.toLocaleString("en-US"))}
                </label>
              </div>
            </div>
            <div className="flex items-center justify-start gap-1 mt-2">
              <ShieldIcon className="w-5 h-5 stroke-2 stroke-green-500" />
              <p className="text-sm text-gray-500">
                All online transactions will be securely handled by 
                <span className="text-green-500 font-medium">{" "}PayMongo</span>.           
              </p>
            </div>
          </section>
          <div className="flex h-full w-full items-end">
            <section className="mb-4 flex flex-col items-start justify-center gap-2 rounded-2xl h-fit w-full ring-1 p-4 bg-gray-50 ring-green-500">
              <label className="text-sm text-gray-500 tracking-wide h-fit">SELECT A PAYMENT METHOD</label>
              <button 
                onClick={()=>handleOpenPayment('Cash')}
                className="h-10 mt-2 flex items-center justify-between ring-1 ring-gray-200 text-gray-700 text-sm w-full rounded-md text-start px-4 py-2 bg-white" 
                type="button"
              >
                <div className="w-fit flex items-center justify-center gap-2">
                  <figure className="flex items-center justify-start w-11 h-6 rounded-md ">
                    <MoneyIcon className="w-7 h-7 stroke-[1.5]  stroke-white fill-gray-500" />
                  </figure>
                  <label className="text-gray-700 text-base">Cash</label>
                </div>
                <ChevronIcon className="w-5 h-5 stroke-2 stroke-gray-500 -rotate-90" />
              </button>
              {["GCash", "PayMaya", "BillEase","GrabPay"].map((method) => (
                <button 
                  onClick={()=>handleOpenPayment(method)}
                  className="h-10  flex items-center justify-between ring-1 ring-gray-200 text-gray-700 text-sm w-full rounded-md text-start px-4 py-2 bg-white" 
                  type="button"
                  key={method}
                >
                  <div className="w-fit flex items-center justify-center gap-2">
                    <img src={paymentLogoMap[method]} className="w-11 h-10 aspect-square flex items-start py-2 pr-4" alt={`${method} Logo`} />
                    <label className="text-gray-700 text-base">{method}</label>
                  </div>
                  <ChevronIcon className="w-5 h-5 stroke-2 stroke-gray-500 -rotate-90" />
                </button>
              ))}
            </section>
          </div>
        </section>
      </article>
      
      <PayWithCashCard finish={finish}/>
      <PayWithEWallet method="GCash" finish={finish}/>
      <PayWithEWallet method="PayMaya" finish={finish}/>
      <PayWithEWallet method="BillEase" finish={finish}/>
      <PayWithEWallet method="GrabPay" finish={finish}/>
    </main>
  )
}

export default PaymentStep