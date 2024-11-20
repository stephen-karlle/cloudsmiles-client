import { privateApiClient, publicApiClient } from "@constants/api.constants"
import { LoginType } from "../types/login.types"


export const loginLocal = async (data: LoginType) => {
  try {
    const response = await publicApiClient.post(`/auth/v1/login-local`, data)
    if (response.status === 200) {
      return response.data
    }
    return false
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const res = await privateApiClient.post('/auth/v1/logout')
    return res.data
  } catch (error) {
    console.log(error)
  }
}