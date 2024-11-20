import { privateApiClient } from "@constants/api.constants";
import { IAppointmentRequest, IUpdateAppointmentPositionRequest, IUpdateAppointmentSizeRequest, IUpdateStatusRequest, } from "../types/appointment.types";



export const createAppointment = async (data: IAppointmentRequest) => {
  try {
    const response = await privateApiClient.post('/appointment/v1/create-appointment', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const updateAppointmentSize = async (data: IUpdateAppointmentSizeRequest) => {
  try {
    const response = await privateApiClient.put('/appointment/v1/update-appointment-size', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }

}
export const updateAppointmentPosition = async (data: IUpdateAppointmentPositionRequest) => {
  try {
    const response = await privateApiClient.put('/appointment/v1/update-appointment-position', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateAppointmentCheckup = async (data: FormData) => {
  try {
    const response = await privateApiClient.post('/appointment/v1/update-appointment-checkup', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateAppointmentStatus = async (data: IUpdateStatusRequest) => {
  try{
    const response = await privateApiClient.put('/appointment/v1/update-appointment-status', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAppointmentCheckup = async (appointmentId: string) => {
  try {
    const res = await privateApiClient.get(`/appointment/v1/get-appointment-checkup/${appointmentId}`)
    return res.data
  } catch (error) {
    
  }
}