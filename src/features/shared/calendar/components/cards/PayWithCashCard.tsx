import { usePaymentAppointmentStore, useViewAppointmentStore } from "../../stores/appointment.stores"
import { AnimatePresence, motion } from "framer-motion"
import { MouseEvent } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { payWithCash } from "../../services/payment.services"
import { PaymentRequestType } from "../../types/appointment.types"
import ErrorMessage from "@components/ui/ErrorMessage"
import PriceInput from "@components/ui/PriceInput"
import ChevronIcon from "@icons/linear/ChevronIcon"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import Button from "@components/ui/Button"
import RadioButton from "@components/ui/RadioButton"
import ComboBox from "@components/ui/ComboBox"
import Label from "@components/ui/Label"
import { convertMonthStringToDate } from "../../utils/converter.utils"

type PayWithCashCardProps = {
  finish: () => void
}

const PayWithCashCard = ({ finish} : PayWithCashCardProps ) => {

  const { control, formState: {errors}, setValue, watch, clearErrors } = useFormContext()
  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment)
  const closeCards = usePaymentAppointmentStore((state) => state.closeCards)
  const isPaymentCardOpen = usePaymentAppointmentStore((state) => state.cardStates["Cash"] || false);


  const totalCost = watch("paymentTotalCost")
  const paymentDueDate = watch("paymentDueDate")
  const paymentAmount = watch("paymentAmount")
  const paymentType = watch("paymentType")

  const payWithCashMutation = useMutation({
    mutationFn: async (paymentData: PaymentRequestType) => {
      try {
        const res = await payWithCash(paymentData);
        return res.data; 
      } catch (error) {
        throw new Error('Failed to fetch payment data');
      }
    },
    onSuccess: () => {
      finish()
    }
  })

  const handlePayWithCash = () => {

    if (!paymentType || !paymentAmount) return;
  
    if (paymentType === "Full" && paymentAmount < totalCost) return;
    if (paymentType === "Installment" && (!paymentDueDate || paymentAmount < 100)) return;

    const paymentStatus = paymentType === "Full" ? "paid" : "partial";

    payWithCashMutation.mutate({
      appointmentId: selectedAppointment.appointmentData._id,
      paymentAmount: watch("paymentAmount"),
      paymentMethod: watch("paymentMethod"),
      paymentNotes: watch("paymentNotes"),
      paymentType: watch("paymentType"),
      paymentDueDate:  paymentType === "Installment" ? convertMonthStringToDate(paymentDueDate) : undefined,
      paymentStatus: paymentStatus,
      paymentTotalCost: totalCost,
    })
    
  }

  const handlePayPreset = (event: MouseEvent, amount: number) => {
    event.preventDefault();
    setValue("paymentAmount", amount)
    clearErrors("paymentAmount")
  } 

  const handleClosePayment = () => {
    closeCards()
    setValue("paymentMethod", "")
  }


  return (
    <AnimatePresence>
      {isPaymentCardOpen &&
        <motion.section 
          className="absolute -left-[28rem] h-fit bottom-8 z-10 bg-white rounded-3xl w-[27rem]"
          initial={{ x: '110%' }}
          animate={{ x: '0%' }}
          exit={{ x: '110%'}}
          transition={{ duration: 0.4, ease: "anticipate" }}
        > 
          <div className="flex flex-col h-full items-center justify-between rounded-3xl">
            <header className="w-full border-b border-gray-200 h-16 flex items-center justify-between p-6">
              <label className="text-lg text-gray-700 font-medium">Cash</label>
              <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center" type="button" onClick={handleClosePayment}>
                <ChevronIcon className="-rotate-90 w-5 h-5 stroke-2 stroke-gray-700" />
              </button>
            </header>
            <div className="flex flex-col items-start justify-center w-full h-full p-6 gap-6">
                <div className="w-full flex justify-between items-center h-6">
                  <h1 className="text-lg font-medium text-gray-700 tracking-wide">Total Payment</h1>
                  <label className="flex items-center justify-center">
                    <PhilippinePesoIcon className="stroke-2 stroke-gray-500 w-6 h-6" />
                    <span className="text-lg font-medium text-gray-700">{totalCost.toLocaleString("en-US")}</span>
                  </label>
                </div>
                <div className="h-full w-full ring-1 ring-gray-200 rounded-md flex flex-col">
                  <div className="h-12 w-full bg-gray-50 border-b border-gray-200 rounded-t-md px-4 flex items-center justify-start gap-1">
                    <p className="text-sm text-gray-700 font-medium">Cash</p>
                  </div>
                  <div className="h-full w-full pt-4 px-4 flex flex-col gap-2">
                    <label className="text-sm text-gray-700 ">Payment Type</label>
                    <Controller
                      name="paymentType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div
                          className="w-full flex gap-4"
                        >
                          <RadioButton 
                            className="h-10 w-full" 
                            value="Full"
                            checked={value === "Full"}
                            setChecked={value => {
                              onChange(value)
                              clearErrors("paymentType")
                            }}
                            didError={!!errors?.paymentType}
                            isDisabled={payWithCashMutation.isPending}                              
                          />
                          <RadioButton 
                            className="h-10 w-full" 
                            value="Installment"
                            checked={value === "Installment"}
                            setChecked={value => {
                              onChange(value)
                              clearErrors("paymentType")
                            }}
                            didError={!!errors?.paymentType}
                            isDisabled={payWithCashMutation.isPending}
                          />
                        </div>
                      )}
                    />
                    <ErrorMessage message={errors?.paymentType?.message} />
                  </div>
                  {paymentType === "Installment" && (
                    <div className="h-full w-full px-4 flex flex-col pb-2">
                      <Label className="text-sm text-gray-700 mt-2 mb-2">Due Date</Label>
                      <Controller 
                        name="paymentDueDate"
                        control={control}
                        render={({ field: {onChange, value} }) => (
                          <ComboBox 
                            options={
                              [
                                "3 Months", 
                                "6 Months", 
                                "9 Months", 
                                "12 Months",
                                "15 Months",
                                "18 Months",
                                "21 Months",
                                "24 Months",
                              ]
                            }
                            placeholder="due date"
                            value={value}
                            setValue={(value) => {
                              onChange(value)
                              clearErrors("paymentDueDate")
                            }}
                            className=""
                            didError={!!errors?.paymentDueDate}
                          />
                        )}
                      />
                     <ErrorMessage message={errors?.paymentDueDate?.message} />
                    </div>
                  )}
                  <div className="h-full w-full pb-4 px-4 flex flex-col gap-2 mt-2">
                    <Label className="text-sm text-gray-700 ">{paymentType === "Installment" ? "Down Payment" : "Amount"}</Label>
                    <Controller 
                      name="paymentAmount"
                      control={control}
                      render={({ field: {onChange, value} }) => (
                        <PriceInput
                          value={value}
                          placeholder="Input amount..."
                          className="w-full"
                          onChange={(e) => {
                            onChange(Number(e.target.value))
                            clearErrors("paymentAmount")
                          }}
                          didError={!!errors?.paymentAmount}
                          currency="₱"
                          maxLength={6}
                        />
                      )}
                    />
                    <ErrorMessage message={errors?.paymentAmount?.message} />
                    <div className="flex items-center justify-center gap-4 ">
                    {[500, 1000, 5000, 10000].map((amount) => (
                      <button
                        key={amount}
                        className="flex items-center justify-center h-10 w-full text-sm text-gray-700 rounded-md ring-1 ring-gray-200"
                        onClick={(e) => handlePayPreset(e, amount)}
                      >
                        <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-4 h-4" />
                        {amount}
                      </button>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-gray-200 p-4">
                <Button 
                  className="w-full" 
                  type="submit"
                  onClick={handlePayWithCash}
                >
                  Pay

                </Button>
              </div>
          </div>
        </motion.section>
      }
    </AnimatePresence>  
  )
}

export default PayWithCashCard