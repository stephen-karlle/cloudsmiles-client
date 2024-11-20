import { privateApiClient } from "@constants/api.constants"
import { PaymentRequestType } from "@features/shared/calendar/types/appointment.types";

export const getPayments = async () => {
  try {
    const res = await privateApiClient.get('/payment/v1/payments')
    return res.data 
  } catch (error) {
    console.error(error);
  }
}

export const getMonthlyRevenue = async () => {
  try {
    const res = await privateApiClient.get('/payment/v1/monthly-revenue')
    return res.data 
  } catch (error) {
    console.error(error);
  }
}

export const partiallyPayWithCash = async (paymentData: PaymentRequestType) => {
  try {
    const res = await privateApiClient.post('/payment/v1/partially-pay-with-cash', paymentData)
    return res.data 
  } catch (error) {
    console.error(error);
  }
}

export const createBill = async (paymentData: PaymentRequestType) => {
  try {
    const res = await privateApiClient.post('/payment/v1/create-bill', paymentData)
    return res.data 
  } catch (error) {
    console.error(error);
  }
}


export const partiallyCheckBillStatus = async (id: string, method: string) => {
  try {
    const res = await privateApiClient.get(`/payment/v1/partially-check-bill-status/${id}?method=${method}`)
    return res.data.status as string
  } catch (error) {
    console.error(error);
  }
}

export const cancelBill = async (id: string, method: string) => {
  try {
    const res = await privateApiClient.post(`/payment/v1/cancel-bill/${id}?method=${method}`)
    return res.data.status as string
  } catch (error) {
    console.error(error);
  }
}

export const checkBillStatus = async (id: string, method: string) => {
  try {
    const res = await privateApiClient.get(`/payment/v1/check-bill-status/${id}?method=${method}`)
    return res.data.status as string
  } catch (error) {
    console.error(error);
  }
}
 