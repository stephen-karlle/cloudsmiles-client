import { privateApiClient } from "@constants/api.constants"


export const getDentist = async (id: string) => {
  try {
    const res = await privateApiClient.get(`/staff/v1/get-dentist/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getDentistMonthlyAppointments = async (id: string, date: Date) => {
  try {
    const res = await privateApiClient.get(`/appointment/v1/get-dentist-monthly-appointments/${id}/${date.toISOString()}`)
    return res.data 
  } catch (error) {
    return error
  }
}