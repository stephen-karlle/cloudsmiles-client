import { Fragment } from "react"
import { usePaymentStore } from "../../stores/payment.store"
import { useTreatmentCosts } from "../../services/state/useTreatmentPrices"
import ToothTreatmentsAccordion from "@features/shared/calendar/components/accordions/ToothTreatmentsAccordion"
import SectionTreatmentsAccordion from "@features/shared/calendar/components/accordions/SectionTreatmentsAccordion"
import GeneralTreatmentsAccordion from "@features/shared/calendar/components/accordions/GeneralTreatmentsAccordion"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"


const NotPaidStep = () => {

  const payment = usePaymentStore((state) => state.selectedPayment)
  const appointment = payment.paymentAppointmentId

  const { data: treatmentCost, isLoading } = useTreatmentCosts(appointment._id)

  
  const toothTreatments = treatmentCost?.tooth ? treatmentCost.tooth : []
  const sectionTreatments = treatmentCost?.section ? treatmentCost.section : []
  const generalTreatments = treatmentCost?.general ? treatmentCost.general : []

  const treatments = [
    ...sectionTreatments,
    ...generalTreatments,
    ...toothTreatments,
  ]

  const totalCost = treatments.map((treatment) => treatment.treatmentCost).reduce((acc, cost) => acc + cost, 0)


  if (isLoading) return <div>Loading...</div>

  return (
    <Fragment>
      <div className="relative flex flex-col items-center justify-center rounded-md ring-1 ring-gray-200 w-full">
        <div className="border-b bg-gray-100 border-gray-200 w-full grid grid-cols-[auto_30%] px-4 py-2">
          <label className="text-xs text-gray-500 tracking-wider">TREATMENT CATEGORY</label>
          <label className="text-xs text-gray-500 tracking-wider text-end">SUB TOTAL</label>
        </div>
        {treatments.length > 0 ? (
          <Fragment>
            <ToothTreatmentsAccordion treatmentCost={treatmentCost} />
              <hr className="border-t border-gray-200 w-full" />
            <SectionTreatmentsAccordion treatmentCost={treatmentCost} />
             <hr className="border-t border-gray-200 w-full" />
            <GeneralTreatmentsAccordion treatmentCost={treatmentCost} />
          </Fragment>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-4 h-52">
            <label className="text-gray-700 font-medium text-lg">No treatments found</label>
            <p className="text-gray-500 text-center text-sm">This patient has no treatments yet. Please add a treatment to this patient.</p>
          </div>
        )}
      </div>
      {treatments.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <label className="text-gray-700 text-base font-medium">Total</label>
          <div className="flex items-center justify-center">
            <label className="text-gray-700 text-base font-medium flex items-center">
              <PhilippinePesoIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
              <span>{totalCost.toLocaleString('en-US')}</span>
            </label>
          </div>
        </div>
      )}
      <section className="">
        
      </section>
    </Fragment>
  )
}

export default NotPaidStep