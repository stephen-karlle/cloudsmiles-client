import { privateApiClient } from "@constants/api.constants";
import { TreatmentRequestType } from "../types/treatment.types";



export const getAvailableComponents  = async () => {
  try {
    const res = await privateApiClient.get(`/treatment/v1/get-available-components`);
    return res.data;
  } catch (error) {
    return error
  }
}

export const getAvailableMedicines = async () => {
  try {
    const res = await privateApiClient.get(`/treatment/v1/get-available-medicines`);
    return res.data;
  } catch (error) {
    return error
  }
}

export const createTreatment = async (newTreatment: TreatmentRequestType) => {
  try {
    const res = await privateApiClient.post(`/treatment/v1/create-treatment`, newTreatment);
    return res.data;
  } catch (error) {
    return error
  }
}

export const getTreatments = async () => {
  try {
    const res = await privateApiClient.get(`/treatment/v1/get-treatments`);
    return res.data;
  } catch (error) {
    return error
  }
}

export const deleteTreatment = async (id: string) => {
  try {
    const res = await privateApiClient.delete(`/treatment/v1/delete-treatment/${id}`);
    return res.data;
  } catch (error) {
    return error
  }
}

export const editTreatment = async ( data: TreatmentRequestType) => {
  try {
    const res = await privateApiClient.put(`/treatment/v1/edit-treatment`, data);
    return res.data;
  } catch (error) {
    return error
  }
}

export const getTreatmentCount = async () => {
  try {
    const res = await privateApiClient.get(`/treatment/v1/get-treatment-count`);
    return res.data;
  } catch (error) {
    return error
  }
}