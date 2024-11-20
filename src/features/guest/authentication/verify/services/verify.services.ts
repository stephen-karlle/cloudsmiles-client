import { privateApiClient } from "@constants/api.constants"
import { VerifyType } from "../types/verify.types"

export const verifyLoginToken = async (token: string | null) => {

  if (!token) {
    throw new Error("Token is required")
  }
  try {
    const res = await privateApiClient.get(`/auth/v1/verify-login-token/${token}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const verifyOtp = async (data: VerifyType) => {
  try {
    const res = await privateApiClient.post('/auth/v1/verify-otp', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const resendOtp = async (email: string) => {
  try {
    const res = await privateApiClient.post('/auth/v1/resend-otp', { email })
    return res.data
  } catch (error) {
    throw error
  }
}