import { AnimatePresence, motion } from "framer-motion"
import { Controller, useFormContext } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Fragment, MouseEvent, useEffect, useState } from "react"
import { useAppointmentQrCode } from "../../services/state/useAppointmentQrCode"
import { checkBillStatus, createBill } from "@features/shared/payments/services/payment.services"
import { paymentLogoMap, paymentMethodMap } from "@features/shared/payments/constants/payment.constants"
import { usePaymentAppointmentStore, useViewAppointmentStore } from "../../stores/appointment.stores"
import { PaymentRequestType } from "@features/shared/calendar/types/appointment.types"
import { convertMonthStringToDate } from "../../utils/converter.utils"
import ErrorMessage from "@components/ui/ErrorMessage"
import RadioButton from "@components/ui/RadioButton"
import PriceInput from "@components/ui/PriceInput"
import Button from "@components/ui/Button"
import ChevronIcon from "@icons/linear/ChevronIcon"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import Label from "@components/ui/Label"
import ComboBox from "@components/ui/ComboBox"

type PayWithEWalletProps = {
  method: string
  finish: () => void
}

const PayWithEWallet = ({ method, finish }: PayWithEWalletProps) => {
  const queryClient = useQueryClient()
  const [timer, setTimer] = useState(0)
  const { 
    control, 
    formState: { errors }, 
    setValue, 
    getValues,
    clearErrors, 
    watch,
    setError
} = useFormContext()
  const selectedAppointment = useViewAppointmentStore(state => state.selectedAppointment) 
  const paymentStep = usePaymentAppointmentStore(state => state.paymentSteps[method])
  const setPaymentStep = usePaymentAppointmentStore(state => state.setPaymentStep)
  const setIsLoading = usePaymentAppointmentStore(state => state.setIsLoading)
  const isLoading = usePaymentAppointmentStore(state => state.isLoading)
  const closeCards = usePaymentAppointmentStore(state => state.closeCards)
  const setPaymentModalOpen = usePaymentAppointmentStore(state => state.setPaymentModalOpen)
  const cardStates = usePaymentAppointmentStore(state => state.cardStates)


  const isPaymentCardOpen = cardStates[method] || false
  const paymentMethod = paymentMethodMap[method]
  const appointment = selectedAppointment.appointmentData
  const totalCost = watch("paymentTotalCost")
  const paymentAmount = watch("paymentAmount")
  const paymentType = watch("paymentType")
  const paymentDueDate = watch("paymentDueDate")
  

  const billMutation = useMutation({
    mutationFn: async (data: PaymentRequestType) => {
      data.paymentDueDate =  paymentDueDate ? convertMonthStringToDate(paymentDueDate) : undefined
      data.paymentMethod = paymentMethod
      await createBill(data)
    },
    onSuccess: () => {
      setPaymentStep(method, 2)
    },
    onSettled: () => setIsLoading(false)
  })

  const statusMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      const status = await checkBillStatus(appointment._id, paymentMethod)
      queryClient.removeQueries({ queryKey: ["appointmentPaymentQrCode"]})
      if (status === "succeeded") finish()
      return status
    },
    onSettled: () => setIsLoading(false)
  })

  const { data: qrCode } = useAppointmentQrCode(appointment._id, method)

  const handlePayPreset = (event: MouseEvent, amount: number) => {
    event.preventDefault()
    setValue("paymentAmount", amount)
    clearErrors("paymentAmount")
    clearErrors('paymentType')
  }

  const handleClosePayment = () => {
    closeCards()
    setValue("paymentMethod", "")
  }

  const handleCreateBill = () => {
    if (!paymentType) {
      return setError("paymentType", { message: "Payment type is required" });
    }
  
    if (paymentType === "Installment") {
      if (!paymentDueDate) {
        return setError("paymentDueDate", { message: "Due date is required for Installment payments" });
      }
      if (paymentAmount < 100) {
        return setError("paymentAmount", { message: "For installment, 100 is the minimum required amount" });
      }
    }
  
    if (paymentType === "Full" && paymentAmount < totalCost) {
      return setError("paymentAmount", { message: "For full payment, amount must be equal to total cost" });
    }
  
    setIsLoading(true);
    const data = getValues() as PaymentRequestType;
    billMutation.mutate(data);
  };
  
  const handleCheckBillStatus = () => {
    if (timer > 0) return
    statusMutation.mutate()
    setTimer(10)
  }

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000)
      return () => clearInterval(countdown)
    }
  }, [timer])



  return (
    <AnimatePresence>
      {isPaymentCardOpen && (
        <motion.section 
          className="absolute -left-[28rem] h-fit bottom-8 z-10 bg-white rounded-3xl w-[27rem]"
          initial={{ x: '110%' }}
          animate={{ x: '0%' }}
          exit={{ x: '110%' }}
          transition={{ duration: 0.4, ease: "anticipate" }}
        >
          <div className="flex flex-col h-full items-center justify-between rounded-3xl">
            <header className="w-full border-b border-gray-200 h-16 flex items-center justify-between p-6">
              <div className="w-fit flex items-center">
                <img src={paymentLogoMap[method]} className="w-11 h-10 aspect-square py-2 pr-4" alt={`${method} Logo`} />
                <label className="text-lg text-gray-700 font-medium">{method}</label>
              </div>
              <button type="button" onClick={handleClosePayment} className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ChevronIcon className="-rotate-90 w-5 h-5 stroke-2 stroke-gray-700" />
              </button>
            </header>

            <div className="flex flex-col w-full p-6 gap-6">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium text-gray-700">Amount Due</h1>
                <label className="flex items-center">
                  <PhilippinePesoIcon className="w-6 h-6 stroke-2 stroke-gray-500" />
                  <span className="text-lg font-medium text-gray-700">{totalCost.toLocaleString("en-US")}</span>
                </label>
              </div>

              {paymentStep === 1 && (
                <div className="h-full w-full ring-1 ring-gray-200 rounded-md flex flex-col">
                  <div className="h-12 w-full bg-gray-50 border-b border-gray-200 rounded-t-md px-4 flex items-center justify-start gap-1">
                    <p className="text-sm text-gray-700 font-medium">Cash</p>
                  </div>
                  <div className="h-full w-full pt-4 px-4 flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Payment Type</label>
                    <Controller
                      name="paymentType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="flex gap-4">
                          {["Full", "Installment"].map((type) => (
                            <RadioButton 
                              key={type}
                              className="h-10 w-full" 
                              value={type}
                              checked={value === type}
                              setChecked={() => {
                                onChange(type)
                                clearErrors("paymentType")
                              }}
                              didError={!!errors?.paymentType}
                            />
                          ))}
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
                  <div className="h-full w-full px-4 pb-4 flex flex-col gap-2 mt-2">
                    <label className="text-sm text-gray-700">{paymentType === "Installment" ? "Down Payment" : "Amount"}</label>
                    <Controller
                      name="paymentAmount"
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                    <div className="flex items-center gap-4">
                      {[500, 1000, 5000, 10000].map((amount) => (
                        <button
                          key={amount}
                          className="flex items-center justify-center h-10 w-full text-sm text-gray-700 rounded-md ring-1 ring-gray-200"
                          onClick={(e) => handlePayPreset(e, amount)}
                        >
                          <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
                          {amount}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {paymentStep === 2 && (
                <div className="flex flex-col items-center w-full">
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="w-full h-full object-contain rounded-3xl" />
                  ) : (
                    <p>QR code not available</p>
                  )}
                </div>
              )}
            </div>

            <div className="w-full border-t border-gray-200 p-4 flex items-center justify-center gap-4">
              {paymentStep === 1 ? (
                <Button 
                  className="w-full"
                  onClick={handleCreateBill}
                  variant={isLoading ? "disabled" : "primary"}
                  disabled={isLoading} 
                >
                  Next
                </Button>
              ) : (
                <Fragment>
                  <Button
                    className="w-fit flex-shrink-0"
                    type="button"
                    variant={isLoading || timer > 0 ? "disabled" : "secondary"}
                    disabled={isLoading || timer > 0} 
                    onClick={() => setPaymentModalOpen(true)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    onClick={handleCheckBillStatus}
                    variant={isLoading || timer > 0 ? "disabled" : "primary"}
                    disabled={isLoading || timer > 0} 
                  >
                    {timer > 0 
                      ? `Please wait ${timer}s to check again...` 
                      : "Payment Received"}
                  </Button>
                </Fragment>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default PayWithEWallet
