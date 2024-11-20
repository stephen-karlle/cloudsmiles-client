import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils"
import { paymentLogoMap } from "../../constants/payment.constants"
import { Fragment } from "react"
import { usePaymentStore } from "../../stores/payment.store"
import { useTreatmentCosts } from "../../services/state/useTreatmentPrices"
import { Controller, useFormContext } from "react-hook-form"
import ToothTreatmentsAccordion from "@features/shared/calendar/components/accordions/ToothTreatmentsAccordion"
import SectionTreatmentsAccordion from "@features/shared/calendar/components/accordions/SectionTreatmentsAccordion"
import GeneralTreatmentsAccordion from "@features/shared/calendar/components/accordions/GeneralTreatmentsAccordion"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import ChevronIcon from "@icons/linear/ChevronIcon"
import MoneyIcon from "@icons/linear/MoneyIcon"
import ShieldIcon from "@icons/linear/ShieldIcon"
import TextArea from "@components/ui/TextArea"


const PartiallyPaidStep = () => {

  const selectedPayment = usePaymentStore((state) => state.selectedPayment)
  const toggleCard = usePaymentStore((state) => state.toggleCard)
  const setPaymentStep = usePaymentStore((state) => state.setPaymentStep)

  const { setValue, control } = useFormContext()
  const appointment = selectedPayment.paymentAppointmentId

  const { data: treatmentCost, isLoading } = useTreatmentCosts(appointment._id)


  const historyBalance = selectedPayment.paymentHistory.map((history) => history.paymentAmount).reduce((acc, cost) => acc + cost, 0)
  const totalCost = selectedPayment.paymentTotalCost
  const balance = historyBalance + selectedPayment.paymentAmount
  const amountDue = totalCost - balance


  const handleOpenPayment = (method: string) => {
    toggleCard(method)
    setValue("paymentMethod", method)
    setPaymentStep(method, 1)

  }

  if (isLoading) return <div>Loading...</div>


  return (
    <Fragment>
      <div className="relative flex flex-col items-center justify-center rounded-md ring-1 ring-gray-200 w-full">
        <div className="border-b bg-gray-100 border-gray-200 w-full grid grid-cols-[auto_30%] px-4 py-2">
          <label className="text-xs text-gray-500 tracking-wider">TREATMENT CATEGORY</label>
          <label className="text-xs text-gray-500 tracking-wider text-end">SUB TOTAL</label>
        </div>
        <ToothTreatmentsAccordion treatmentCost={treatmentCost} />
        <hr className="border-t border-gray-200 w-full" />
        <SectionTreatmentsAccordion treatmentCost={treatmentCost} />
        <hr className="border-t border-gray-200 w-full" />
        <GeneralTreatmentsAccordion treatmentCost={treatmentCost} />
      </div>
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
          <label className="text-gray-500 text-base">Balance</label>
          <div className="flex items-center justify-center">
            <PhilippinePesoIcon className="stroke-2 stroke-gray-500 w-5 h-5" />
            <label className="text-gray-500 text-base font-medium ">
              {balance.toLocaleString("en-US")}
            </label>
          </div>          
        </div>
        <div className="flex w-full items-center justify-between">
          <label className="text-gray-500 text-base">Amount Due</label>
          <div className="flex items-center justify-center">
            <PhilippinePesoIcon className="stroke-2 stroke-gray-500 w-5 h-5" />
            <label className="text-gray-500 text-base font-medium ">
              {amountDue.toLocaleString("en-US")}
            </label>
          </div>          
        </div>
        <div className="flex w-full items-center justify-between mt-2">
          <label className="text-gray-700 text-base font-medium">Total Cost</label>
          <div className="flex items-center justify-center">
            <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
            <label className="text-gray-700 text-base font-medium ">
              {(totalCost.toLocaleString("en-US"))}
            </label>
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-y border-dashed py-2 border-rose-500 mt-4 mb-6">
          <label className="text-rose-500 text-xs uppercase">Due Date</label>
          <div className="flex items-center justify-center">
            <label className="text-rose-500 text-sm font-normal underline-offset-2 ">
              {formatISODateWithStringWithSuffix(selectedPayment.paymentDueDate)}
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
      <section className="w-full h-full items-end flex">
        <div className="mb-4 flex flex-col items-start justify-center gap-2 rounded-2xl h-fit w-full ring-1 p-4 bg-gray-50 ring-green-500">
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
                <img src={paymentLogoMap[method]} className="w-10 h-10 aspect-square flex items-start py-2 pr-4" alt={`${method} Logo`} />
                <label className="text-gray-700 text-base">{method}</label>
              </div>
              <ChevronIcon className="w-5 h-5 stroke-2 stroke-gray-500 -rotate-90" />
            </button>
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default PartiallyPaidStep