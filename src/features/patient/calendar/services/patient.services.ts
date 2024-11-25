import { privateApiClient } from "@constants/api.constants"
import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types"
import { ReviewType } from "../types/patient.types"


export const getPatientMonthlyAppointments = async (userId: string, date: Date) => {
  try {
    const res = await privateApiClient.get(`/appointment/v1/get-patient-monthly-appointments/${userId}/${date.toISOString()}`)
    return res.data as IAppointmentResponse[]
  } catch (error) {
    console.log(error)
  }
}



export const getBills = async (appointmentId: string) => {
  try {
    const res = await privateApiClient.get(`/payment/v1/get-bills/${appointmentId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const createReview = async (data: ReviewType) => {
  try {
    const res = await privateApiClient.post(`/review/v1/create-review`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const res = await privateApiClient.put(`/appointment/v1/cancel-appointment/${appointmentId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getAppointmentReview = async (appointmentId: string) => {
  try {
    const res = await privateApiClient.get(`/review/v1/get-appointment-review/${appointmentId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
