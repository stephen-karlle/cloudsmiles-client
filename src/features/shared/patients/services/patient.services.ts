import { privateApiClient } from "@constants/api.constants"
import { PatientResponseType } from "../types/patient.types";

export const getPatients = async () => {
  try {
    const res = await privateApiClient.get('/patient/v1/get-patients');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPatientCount = async () => {
  try {
    const res = await privateApiClient.get('/patient/v1/get-patient-count');
    return res.data.patientCount
  } catch (error) {
    console.error(error);
  }
}

export const createPatient = async (data: FormData) => {
  try {
    const res = await privateApiClient.post('/patient/v1/create-patient', data);
    return res.data as PatientResponseType
  } catch (error) {
    console.error(error);
  }
}

export const updatePatient = async (data: FormData) => {
  try {
    const res = await privateApiClient.put('/patient/v1/update-patient', data);
    return res.data as PatientResponseType
  } catch (error) {
    console.error(error);
  }
}

export const deletePatient = async (id: string) => {
  try {
    const res = await privateApiClient.delete(`/patient/v1/delete-patient/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}