import { privateApiClient } from "@constants/api.constants";
import { SecurityType } from "../types/settings.types";

export const editProfile = async (data: FormData) => {
  try {
    const res = await privateApiClient.post('/profile/v1/edit-profile', data);
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};


export const changePassword = async (data: SecurityType) => {
  try {
    const res = await privateApiClient.post('/auth/v1/change-password', data);
    return res.data;
  } catch (error) {
    throw error;
  }

}