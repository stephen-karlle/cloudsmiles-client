import { privateApiClient } from "@constants/api.constants";
import { DentalRecordType } from "../types/appointment.types";


export const findPatients = async (keywords: string) => {
  try {
    const response = await privateApiClient.get(`/patient/v1/find-patients/${keywords}`);
    return response.data;
  }  catch (error) {
    console.error(error);
  }
}

export const addDentalRecord = async (data: DentalRecordType) => {
  try {
    const response = await privateApiClient.post(`/patient/v1/add-dental-record/`, data);
    return response.data;
  }  catch (error) {
    console.error(error);
  }
}

export const getDentalRecords = async (patientId: string) => {
  try {
    const response = await privateApiClient.get(`/patient/v1/get-dental-record/${patientId}`);
    return response.data;
  }  catch (error) {
    console.error(error);
  }
}