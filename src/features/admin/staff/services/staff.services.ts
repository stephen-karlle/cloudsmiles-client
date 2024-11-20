import { privateApiClient } from "@constants/api.constants"


export const getStaffCount = async () => {
  try {
    const res= await privateApiClient.get("/staff/v1/get-staff-count")
    return res.data
  } catch (error) {
    throw error
  }
}