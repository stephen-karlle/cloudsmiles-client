import { useMutation, useQueryClient } from "@tanstack/react-query"
import { partiallyCheckBillStatus, createBill } from "../../services/payment.services"
import { PaymentRequestType } from "@features/shared/calendar/types/appointment.types"
import { paymentLogoMap, paymentMethodMap } from "../../constants/payment.constants"
import { AnimatePresence, motion } from "framer-motion"
import { Controller, useFormContext } from "react-hook-form"
import { usePaymentStore } from "../../stores/payment.store"
import { usePaymentQrCode } from "../../services/state/useQrCode"
import { Fragment, MouseEvent, useEffect, useState} from "react"
import { toast } from "sonner"

import ChevronIcon from "@icons/linear/ChevronIcon"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import Button from "@components/ui/Button"
import PriceInput from "@components/ui/PriceInput"
import ErrorMessage from "@components/ui/ErrorMessage"
import Toast from "@components/ui/Toast"


type PartiallyPayWithEWalletProps = {
  method: string
  finish: () => void
}



const PartiallyPayWithEWallet = ({ method, finish } :PartiallyPayWithEWalletProps ) => {
  const [ timer, setTimer ] = useState(0)
  const queryClient = useQueryClient()
  const selectedPayment = usePaymentStore((state) => state.selectedPayment)
  const appointment = selectedPayment.paymentAppointmentId
  const patient = appointment.appointmentPatientId
  const { control, formState: {errors}, setValue, getValues, reset, clearErrors } = useFormContext()
  const paymentStep = usePaymentStore((state) => state.paymentSteps[method])
  const setPaymentStep = usePaymentStore((state) => state.setPaymentStep)
  const setIsLoading = usePaymentStore((state) => state.setIsLoading)
  const isLoading = usePaymentStore((state) => state.isLoading)
  const isPaymentCardOpen = usePaymentStore((state) => state.cardStates[method] || false);
  const closeCards = usePaymentStore((state) => state.closeCards)
  const toggleModal = usePaymentStore((state) => state.toggleModal)
  const paymentMethod = paymentMethodMap[method]
  const historyBalance = selectedPayment.paymentHistory.map((history) => history.paymentAmount).reduce((acc, cost) => acc + cost, 0)
  const totalCost = selectedPayment.paymentTotalCost
  const balance = historyBalance + selectedPayment.paymentAmount
  const amountDue = totalCost - balance

  const billMutation = useMutation({
    mutationFn: async (data:PaymentRequestType) => {
      setIsLoading(true)
      data.paymentMethod = paymentMethod
      await createBill(data)
    },
    onSuccess: () => {
      setPaymentStep(method, 2)
    },
    onSettled: () => setIsLoading(false)
  });


  const statusMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      const status = await partiallyCheckBillStatus(appointment._id, paymentMethod);
      if (status === "succeeded") {
        queryClient.invalidateQueries({queryKey: ["paymentTableData"]})
        queryClient.invalidateQueries({queryKey: ["paymentQrCode"]})
        reset()
        setPaymentStep(method, 1)
        finish()
        toast.custom(() => (
          <Toast title={patient.patientFullName} message="has been paid successfully" subtitle={appointment.appointmentSerialId} status="success" />
        ), { duration: 5000 });
      }
      return status 
    },
    onSettled: () => {
      setIsLoading(false)
    }
  });
  
  const { data: qrCode } = usePaymentQrCode(appointment._id, method)

 

  const handlePayPreset = (event: MouseEvent, amount: number) => {
    event.preventDefault();
    setValue("paymentAmount", amount)
    clearErrors("paymentAmount")
  } 

  const handleClosePayment = () => {
    closeCards()
    setValue("paymentMethod", "")
  }

  const handleCreateBill = () => {
    const data = getValues() as PaymentRequestType
    billMutation.mutate(data)
  }


  const handleCheckBillStatus = () => {
    if (timer > 0) return;
    statusMutation.mutate()
    setTimer(10); 
  }

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

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
              <div className="w-fit flex items-center justify-center">
                <img src={paymentLogoMap[method]} className="w-10 h-10 aspect-square  flex items-start py-2 pr-4" alt={`${method} Logo`} />
                <label className="text-lg text-gray-700 font-medium">{method}</label>
              </div>
              <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center" type="button" onClick={handleClosePayment}>
                <ChevronIcon className="-rotate-90 w-5 h-5 stroke-2 stroke-gray-700" />
              </button>
            </header>
            <div className="flex flex-col items-start justify-center w-full h-full p-6 gap-6">
              <div className="w-full flex justify-between items-center h-6">
                <h1 className="text-lg font-medium text-gray-700 tracking-wide">Amount Due</h1>
                <label className="flex items-center justify-center">
                  <PhilippinePesoIcon className="stroke-2 stroke-gray-500 w-6 h-6" />
                  <span className="text-lg font-medium text-gray-700">{amountDue.toLocaleString("en-US")}</span>
                </label>
              </div>
              <div className="h-full w-full ring-1 ring-gray-200 rounded-md flex flex-col">
                <div className="h-12 w-full bg-gray-50 border-b border-gray-200 rounded-t-md px-4 flex items-center justify-start gap-1">
                  <p className="text-sm text-gray-700 font-medium">{method}</p>
                </div>
                {paymentStep === 1 && (
                  <div className=" w-full pb-4 px-4 flex flex-col gap-2 ">
                    <label className="text-sm text-gray-700 mt-4">Amount</label>
                    <Controller 
                      name="paymentAmount"
                      control={control}
                      render={({ field: {onChange, value} }) => (
                        <PriceInput
                          value={value}
                          placeholder="Input amount..."
                          className="w-full"
                          onChange={(e) => onChange(Number(e.target.value))}
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
                )}

                {paymentStep === 2 && (
                  <div className="flex flex-col justify-center items-center h-full w-full ">
                    {
                      qrCode ? (
                        <img src={qrCode} alt="QR Code" className="h-full w-full object-contain rounded-3xl" />
                      ) : (
                        <p>QR code not available</p>
                      )
                    }
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 w-full border-t border-gray-200 p-4">
              {paymentStep === 1 && (
                <Button 
                  className="w-full"
                  onClick={handleCreateBill}
                  variant={isLoading ? "disabled" : "primary"}
                  disabled={isLoading} 
                >
                  Next
                </Button>
              )}
              {paymentStep === 2 && (
                <Fragment>
                  <Button
                    className="w-fit flex-shrink-0"
                    type="button"
                    variant={isLoading || timer > 0 ? "disabled" : "secondary"}
                    disabled={isLoading || timer > 0} // Disable button during timer
                    onClick={() => toggleModal(selectedPayment.paymentSerialId)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    onClick={handleCheckBillStatus}
                    variant={isLoading || timer > 0 ? "disabled" : "primary"}
                    disabled={isLoading || timer > 0} // Disable button during timer
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
      }
    </AnimatePresence>  
  )
}

export default PartiallyPayWithEWallet