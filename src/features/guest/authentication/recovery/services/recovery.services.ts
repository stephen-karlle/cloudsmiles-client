import { privateApiClient } from "@constants/api.constants";
import { RecoveryType, ResetPasswordType } from "../types/recovery.types";


export const RecoverAccount = async (data: RecoveryType) => {
  try { 
    const response = await privateApiClient.post("/auth/v1/recover-account", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const VerifyRecoveryToken = async (token: string | null) => {

  if (!token) {
    throw new Error("Invalid token");
  }
  
  try { 
    const response = await privateApiClient.get(`/auth/v1/verify-recovery-token/${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const ResetPassword = async (data: ResetPasswordType) => {
  try { 
    const response = await privateApiClient.post("/auth/v1/reset-password", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}