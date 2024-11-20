import { formatISODateWithStringWithSuffix, formatTimeRange } from '@features/shared/calendar/utils/calendar.utils'
import { usePatientStore } from '../../stores/patient.store'
import { useDrawerStore } from '@stores/drawer.store'
import { getStatusStyle } from '@features/shared/payments/utils/color.utils'
import { paymentLogoMap } from '@features/shared/payments/constants/payment.constants'
import { formatPaymentMethod } from '@features/shared/payments/utils/formatter'
import { useTreatmentCosts } from '@features/shared/payments/services/state/useTreatmentPrices'
import ToothTreatmentsAccordion from '@features/shared/calendar/components/accordions/ToothTreatmentsAccordion'
import GeneralTreatmentsAccordion from '@features/shared/calendar/components/accordions/GeneralTreatmentsAccordion'
import SectionTreatmentsAccordion from '@features/shared/calendar/components/accordions/SectionTreatmentsAccordion'
import SuccessVector from '@assets/success.svg'
import DrawerHeader from '@components/shared/DrawerHeader'
import Button from '@components/ui/Button'
import CalendarIcon from '@icons/linear/CalendarIcon'
import Label from '@components/ui/Label'
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon'
import MoneyIcon from '@icons/linear/MoneyIcon'
import TreatmentIcon from '@icons/linear/TreatmentIcon'

const FinishAppointmentForm = () => {

  const selectedAppointment = usePatientStore((state) => state.selectedAppointment)
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const setExtraDrawerOpen = useDrawerStore((state) => state.setExtraDrawerOpen)

  const appointmentData = selectedAppointment.appointmentData
  const paymentData = selectedAppointment.paymentData
  // const dentistData = selectedAppointment.dentistData

  const method = formatPaymentMethod(paymentData.paymentMethod)
  const style = getStatusStyle(paymentData.paymentStatus);

  const handleOpenRating = () => {
    setDrawerOpen(false)
    setTimeout(() => {
      setExtraDrawerOpen(true)
    }, 300)
  }

  const { data: treatmentCost, isLoading } = useTreatmentCosts(selectedAppointment.appointmentData._id)

  if (isLoading) return <div>Loading...</div>


  const totalTreatments = (treatmentCost?.tooth?.length || 0) + (treatmentCost?.section?.length || 0) + (treatmentCost?.general?.length || 0)

  return (
    <article className="flex flex-col w-full h-full">
      <DrawerHeader 
        title={`#${appointmentData.appointmentSerialId}`}
        handleClose={() => setDrawerOpen(false)}
      />
      <section className="flex flex-col items-center justify-start w-full h-full gap-8 overflow-y-scroll py-1">
        <div className="flex flex-col items-center justify-center w-full h-fit pt-8 ">
          <img src={SuccessVector} alt="Success" className="w-20 h-20" />
          <div className="flex flex-col items-center justify-center mt-4" >
            <div className="flex items-center " >
              <h1 className="text-2xl font-medium text-gray-700"> Thank you for choosing </h1>
              <label className="ml-1 text-2xl font-medium text-lime-500 break-keep tracking-wide">VS
                <span className="text-green-950 tracking-wide">Dental</span>
              </label>
            </div>
            <p className="text-sm text-gray-500 px-24 text-center">Your appointment has been successfully completed. We hope to see you again soon! </p>
          </div>
        </div>
        <div className="px-6 w-full">
          <div className="w-full ring-1 ring-gray-200 rounded-md h-fit">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-2">
              <div className="flex items-center gap-2">
                <figure className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100">
                  <CalendarIcon className="h-5 w-5 stroke-2 stroke-gray-500" />
                </figure>
                <h1 className="text-lg font-medium text-gray-700">Appointment Details</h1>
              </div>
              <label className="text-xs uppercase px-2 py-1 rounded-md bg-green-50 text-green-500">{appointmentData.appointmentStatus}</label>
            </div>
            <div className="flex flex-col items-start justify-start p-4 gap-2">
              <div className="flex w-full items-center justify-between">
                <Label>Appointment ID</Label>
                <label className="text-sm text-gray-700 font-medium">#{appointmentData.appointmentSerialId}</label>
              </div>
              <div className="flex w-full items-center justify-between">
                <Label>Appointment Date</Label>
                <label className="text-sm text-gray-700 font-medium">{formatISODateWithStringWithSuffix(appointmentData.appointmentDate.end)}</label>
              </div>
              <div className="flex w-full items-center justify-between">
                <Label>Appointment Time</Label>
                <label className="text-sm text-gray-700 font-medium">{formatTimeRange(new Date(appointmentData.appointmentDate.start), new Date(appointmentData.appointmentDate.end))}</label>
              </div>
            </div>
          </div>
          <div className="w-full ring-1 ring-gray-200 rounded-md h-fit mt-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-2">
              <div className="flex items-center gap-2">
                <figure className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100">
                  <TreatmentIcon className="h-5 w-5 stroke-2 stroke-gray-500" />
                </figure>
                <h1 className="text-lg font-medium text-gray-700">Treatment Details</h1>
              </div>
              <Label>
                {totalTreatments} Treatment{totalTreatments !== 1 && 's'}
              </Label>
              </div>
            <ToothTreatmentsAccordion treatmentCost={treatmentCost} />
            <hr className="border-t border-gray-200 w-full" />
            <SectionTreatmentsAccordion treatmentCost={treatmentCost} />
            <hr className="border-t border-gray-200 w-full" />
            <GeneralTreatmentsAccordion treatmentCost={treatmentCost} />
          </div>
        </div>
        <div className="p-6 w-full flex flex-col  border-t boder-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium text-gray-700">Payment Details</h1>
            <span className={`${style} px-2 py-1 rounded-full uppercase text-xs`}>
              {paymentData.paymentStatus}
            </span>
          </div>
          <div className="flex w-full items-center justify-between mt-4">
            <Label>Payment ID</Label>
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-sm font-medium flex items-center">#{paymentData.paymentSerialId}</label>
            </div>
          </div>
          <div className="flex w-full items-center justify-between mt-1">
            <Label>Payment Type</Label>
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-sm font-medium flex items-center">{paymentData.paymentType}</label>
            </div>
          </div>

          <div className="flex w-full items-center justify-between mt-1">
            <Label>Payment Method</Label>
            <div className="w-fit flex items-center gap-2">
              {method === "Cash" ? (
                <figure className="flex items-center justify-start w-6 h-6 rounded-md ">
                  <MoneyIcon className="w-5 h-5 stroke-[1.5]  stroke-white fill-gray-500" />
                </figure>                      
              ) : (
                <img src={paymentLogoMap[method]} className="w-9 aspect-square flex items-start py-2 pl-4" alt={`${method} Logo`} />
              )}
              <label className="text-gray-700 text-sm font-medium">{method}</label>
            </div>
          </div>
          <hr className="border-t border-dashed border-gray-200  w-full my-4" />
          <div className="flex w-full items-center justify-between">
            <Label>Amount Paid</Label>
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-base font-medium flex items-center">
                <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
                <span>{paymentData.paymentAmount.toLocaleString('en-US')}</span>
              </label>
            </div>
          </div>
          <div className="flex w-full items-center justify-between mt-1">
            <label className="text-base font-medium text-gray-700">Total Cost</label>
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-base font-medium flex items-center">
                <PhilippinePesoIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
                <span>{paymentData.paymentTotalCost.toLocaleString('en-US')}</span>
              </label>
            </div>
          </div>
          {paymentData.paymentType === "Installment" && (
            <div className="flex w-full items-center justify-between border-y border-dashed py-2 border-rose-500 mt-4">
              <label className="text-rose-500 text-xs uppercase">Due Date</label>
              <div className="flex items-center justify-center">
                <label className="text-rose-500 text-sm font-normal underline-offset-2 ">
                  {formatISODateWithStringWithSuffix(paymentData.paymentDueDate)}
                </label>
              </div>
            </div>
          )}
        </div>

      </section>
      <section className="flex gap-4 items-center justify-center h-fit p-6 border-t w-full border-gray-200">
        <Button 
          variant="secondary"
          onClick={() => setDrawerOpen(false)}
          className="w-1/2"
        >
          Close
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onClick={handleOpenRating}
        >
          Rate Us
        </Button>
      </section>
    </article>
  )
}

export default FinishAppointmentForm