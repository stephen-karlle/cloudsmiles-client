import { privateApiClient } from "@constants/api.constants";

export const createNewAssistant = async (data: FormData) => {
  try {
    const response = await privateApiClient.post("/staff/v1/create-assistant", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateAssistant = async (data: FormData) => {
  try {
    const response = await privateApiClient.put("/staff/v1/update-assistant", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteAssistant = async (assistantId: string) => {
  try {
    const response = await privateApiClient.delete(`/staff/v1/delete-assistant/${assistantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getAssistants = async () => {
  try {
    const response = await privateApiClient.get("/staff/v1/get-assistants")
    return response.data;
  } catch (error) {
    throw error;
  }
}