import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils'
import { usePatientStore } from '../../stores/patient.store'
import { TreatmentCostsResponseType } from '@features/admin/treatments/types/treatment.types'
import { paymentLogoMap } from '@features/shared/payments/constants/payment.constants'
import { BillResponseType } from '../../types/patient.types'
import { formatPaymentMethod } from '@features/shared/payments/utils/formatter'
import GeneralTreatmentsAccordion from '@features/shared/calendar/components/accordions/GeneralTreatmentsAccordion'
import SectionTreatmentsAccordion from '@features/shared/calendar/components/accordions/SectionTreatmentsAccordion'
import ToothTreatmentsAccordion from '@features/shared/calendar/components/accordions/ToothTreatmentsAccordion'
import ChevronIcon from '@icons/linear/ChevronIcon'
import ShieldIcon from '@icons/linear/ShieldIcon'
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon'
import InformationIcon from '@icons/linear/InformationIcon'

type PaymentStepProps = {
  treatmentCost: TreatmentCostsResponseType
  bills: BillResponseType[]
}

const PaymentStep = ({
  treatmentCost,
  bills,
}: PaymentStepProps) => {

  const selectedAppointment = usePatientStore((state) => state.selectedAppointment)
  const toothTreatments = treatmentCost?.tooth ? treatmentCost.tooth : []
  const sectionTreatments = treatmentCost?.section ? treatmentCost.section : []
  
  const toothTreatmentsTotalCost = toothTreatments.map((treatment) => treatment.treatmentCost * (treatment?.tooths?.length ? treatment?.tooths?.length : 1)).reduce((acc, cost) => acc + cost, 0)
  const sectionTreatmentTotalCost = sectionTreatments.map((treatment) => treatment.treatmentCost * (treatment?.sections?.length ? treatment?.sections?.length : 1)).reduce((acc, cost) => acc + cost, 0)
  const generalTreatmentTotalCost = treatmentCost?.general ? treatmentCost.general.map((general) => general.treatmentCost).reduce((acc, cost) => acc + cost, 0) : 0

  const totalCost = toothTreatmentsTotalCost + sectionTreatmentTotalCost + generalTreatmentTotalCost
  const taxInPhilippines = 0

  const paymentMethods = bills.map((bill) => {
    return formatPaymentMethod(bill.billMethod)
  })

  const handlePaymentMethodClick = ( bill: BillResponseType) => {
    window.open(bill.billRedirectUrl, '_blank');
  }

  return (
    <section 
      className="flex flex-col h-full w-full items-center justify-start gap-6 overflow-y-auto "
      style={{scrollbarGutter: "stable"}}
    >
      <section className="flex flex-col w-full px-6 ">
        <div className="flex items-center justify-between w-full mt-4">
          <label className="text-xs text-gray-500 tracking-wider">PAYMENT TO</label>
          <label className="text-xs text-gray-500 tracking-wider">PAYMENT DATE</label>
        </div>
        <div className="flex items-center justify-between w-full">
          <label className="text-lg text-gray-700 font-medium">{selectedAppointment.patientData.patientFullName}</label>
          <label className="text-sm text-gray-700 ">{ formatISODateWithStringWithSuffix(new Date())}</label>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-gray-700 max-w-[50%]">{selectedAppointment.patientData.patientAddress}</p>
          <div className="text-xs text-rose-500 bg-rose-50 py-1 px-2 rounded-full">NOT PAID</div>
        </div>
      </section>
      <div className="flex w-full px-6">
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
      </div>
      <section className="flex flex-col w-full gap-2 h-full px-6">

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
      {paymentMethods.length > 0 ? (
        <div className="flex h-full w-full items-end">
          <section className="mb-4 flex flex-col items-start justify-center gap-2 rounded-2xl h-fit w-full ring-1 p-4 bg-gray-50 ring-green-500">
            <label className="text-sm text-gray-500 tracking-wide h-fit">
              SELECT A PAYMENT METHOD
            </label>
            {paymentMethods.map((method, index) => (
              <button 
                onClick={() => handlePaymentMethodClick(bills[index])}
                className="h-10  flex items-center justify-between ring-1 ring-gray-200 text-gray-700 text-sm w-full rounded-md text-start px-4 py-2 bg-white" 
                type="button"
                key={index}
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
      ): (
        <div className="w-full flex items-center justify-center gap-2 p-6 border-t border-gray-200">
          <InformationIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
          <label className="text-gray-500 text-sm">
            Please wait for the clinic to generate the bill.
          </label>
        </div>
      )}
    </section>
  )
}

export default PaymentStep