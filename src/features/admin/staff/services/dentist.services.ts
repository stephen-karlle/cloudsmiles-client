import { privateApiClient } from "@constants/api.constants";

export const createNewDentist = async (data: FormData) => {
  try {
    const response = await privateApiClient.post("/staff/v1/create-dentist", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateDentist = async (data: FormData) => {
  try {
    const response = await privateApiClient.put("/staff/v1/update-dentist", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteDentist = async (dentistId: string) => {
  try {
    const response = await privateApiClient.delete(`/staff/v1/delete-dentist/${dentistId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getDentists = async () => {
  try {
    const response = await privateApiClient.get("/staff/v1/get-dentists")
    return response.data;
  } catch (error) {
    throw error;
  }
}