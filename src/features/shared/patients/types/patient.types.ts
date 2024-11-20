import { CheckupDataResponseType, DentalRecordType, IAppointmentResponse } from "@features/shared/calendar/types/appointment.types";


export type PatientResponseType = {
  _id: string;
  patientAvatar?: string;
  patientFullName: string;
  patientDateOfBirth: string;
  patientGender: string;
  patientSerialId: string;
  patientAddress: string;
  patientStatus: "Verified" | "Pending";
  patientCredentialId: {
    credentialEmail: string;
    credentialPhoneNumber: string;
  }
  createdAt: string;
}

export type PatientRequestType = {
  patientId?: string;
  patientAvatar?: any
  patientFullName: string;
  patientDateOfBirth: string | Date;
  patientGender: string;
  patientAddress: string;
  patientEmail: string;
  patientPhoneNumber: string;
  createdAt: Date;
}

export type PatientProfileResponseType = {
  recordData: DentalRecordType
  patientData: PatientResponseType
  checkupData: CheckupDataResponseType[]
  appointmentData: IAppointmentResponse[]
}

