import { publicApiClient } from "@constants/api.constants"
import { SignUpType } from "../types/stores.types"

export const validateEmail = async (email: string) => {
  try {
    const response = await publicApiClient.get(`/auth/v1/validate-email/${email}`)
    if (response.status === 200) {
      return true
    }
    throw new Error("Email is already taken")
  } catch (error) {
    throw new Error("Email is already taken")
  }
}

export const signUpLocal = async (data: SignUpType) => {
  try {
    const response = await publicApiClient.post("/auth/v1/sign-up/local", data)
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}


export const verifyOTP = async (email: string, otp: number | null) => {
  try {
    const response = await publicApiClient.post("/auth/v1/verify-otp", { email, otp });    
    console.log(response)
    if (response.status === 200) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}