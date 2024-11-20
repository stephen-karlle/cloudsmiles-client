import { privateApiClient } from "@constants/api.constants"
import { PaymentRequestType } from "../types/appointment.types"

export const createPayment = async (paymentData: PaymentRequestType) => {
  try {
    const res = await privateApiClient.post('payment/v1/create-bill', paymentData )
    return res.data
  } catch (error) {
    console.log(error)
  }
}


export const payWithCash = async ( paymentData: PaymentRequestType) => {
  try {
    const res = await privateApiClient.post('/payment/v1/pay-with-cash', paymentData)
    return res.data
  } catch (error) {
    console.log(error)
  }
} 

export const getPaymentStatus = async (appointmentId: string) => {
  try {
    const res = await privateApiClient.get(`/payment/v1/check-payment-status/${appointmentId}`)
    return res.data.status
  } catch (error) {
    console.log(error)
  }
}