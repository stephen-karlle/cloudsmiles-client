import { privateApiClient } from "@constants/api.constants"
import { IDentistResponse } from "@features/admin/staff/types/dentists.types"



export const getDentists = async () => {
  try {
    const response = await privateApiClient.get(`/staff/v1/get-dentists`)
    console.log(response.data)
    return response.data as IDentistResponse[]
  } catch (error) {
    console.log(error)
  }
}



export const updateChainData = async (data: any) => {
  try {
    const res = await privateApiClient.put(`/agent/v1/update-chain-data`,data)
    return res.data
  } catch(error) {
    console.log(error)
  }
}

export const getDentistTimeAvailability = async (patientId: string) => {
  try {
    const res = await privateApiClient.get(`/staff/v1/get-dentist-time-availability/${patientId}`)
    return res.data
  } catch(error) {
    console.log(error)
  }
}

export const getDentistDateAvailability = async (patientId: string) => {
  try {
    const res = await privateApiClient.get(`/staff/v1/get-dentist-date-availability/${patientId}`)
    return res.data
  } catch(error) {
    console.log(error)
  }
}