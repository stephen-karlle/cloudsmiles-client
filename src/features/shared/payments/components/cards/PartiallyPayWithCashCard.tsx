import { MouseEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Controller, useFormContext } from "react-hook-form"
import { usePaymentStore } from "../../stores/payment.store"
import ErrorMessage from "@components/ui/ErrorMessage"
import PriceInput from "@components/ui/PriceInput"
import ChevronIcon from "@icons/linear/ChevronIcon"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import Button from "@components/ui/Button"


const PartiallyPayWithCashCard = () => {


  const { control, clearErrors, setValue, formState: { errors } } = useFormContext()
  const selectedPayment = usePaymentStore((state) => state.selectedPayment)
  const isPaymentCardOpen = usePaymentStore((state) => state.cardStates["Cash"] || false);
  const closeCards = usePaymentStore((state) => state.closeCards)

  const historyBalance = selectedPayment.paymentHistory.map((history) => history.paymentAmount).reduce((acc, cost) => acc + cost, 0)
  const totalCost = selectedPayment.paymentTotalCost
  const balance = historyBalance + selectedPayment.paymentAmount
  const amountDue = totalCost - balance

  const handlePayPreset = (event: MouseEvent, amount: number) => {
    event.preventDefault();
    setValue("paymentAmount", amount)
    clearErrors("paymentAmount")
  } 

  const handleClosePayment = () => {
    closeCards()
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
                  <h1 className="text-lg font-medium text-gray-700 tracking-wide">Amount Due</h1>
                  <label className="flex items-center justify-center">
                    <PhilippinePesoIcon className="stroke-2 stroke-gray-500 w-6 h-6" />
                    <span className="text-lg font-medium text-gray-700">{amountDue.toLocaleString("en-US")}</span>
                  </label>
                </div>
                <div className="h-full w-full ring-1 ring-gray-200 rounded-md flex flex-col">
                  <div className="h-12 w-full bg-gray-50 border-b border-gray-200 rounded-t-md px-4 flex items-center justify-start gap-1">
                    <p className="text-sm text-gray-700 font-medium">Cash</p>
                  </div>
                  <div className="h-full w-full p-4 flex flex-col gap-2">
                    <label className="text-sm text-gray-700 ">Amount</label>
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

export default PartiallyPayWithCashCard