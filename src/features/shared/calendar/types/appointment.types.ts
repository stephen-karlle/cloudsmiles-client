import { IDentistResponse } from "@features/admin/staff/types/dentists.types";
import { ITreatmentDataResponse } from "@features/admin/treatments/types/treatment.types";

interface ITimeRequest {
  start: Date | string | null;
  end: Date | null;
}

export interface ITimeResponse {
  start: string;
  end: string;
}

interface IScheduleResponse {
  day: string;
  start: string;
  end: string;
}

export interface IDentistData {
  _id: string;
  dentistAddress: string;
  dentistAvatar: string;
  dentistCosmeticServices: string[];
  dentistEmploymentType: string;
  dentistFullName: string;
  dentistGender: string;
  dentistDateOfBirth: Date | string
  dentistCredentialId: {
    credentialEmail: string;
    credentialPhoneNumber: string;
  }
  dentistMedicalServices: string[];
  dentistSpecialization: string;
  dentistSchedule: IScheduleResponse[];
  unAvailableDates: ITimeResponse[];
  startTime: string;
  createdAt: string;
  updatedAt: string;
  endTime: string;
}


export interface IPatientData {
  _id: string;
  patientFullName: string;
  patientDateOfBirth: Date | null;
  patientGender: string;
  patientEmail: string;
  patientPhoneNumber: string;
  patientAddress: string;
}









// REQUEST TYPES

export type IUpdateStatusRequest = {
  appointmentId: string;
  appointmentStatus: string;
}

export interface IUpdateAppointmentSizeRequest {
  _id: string;
  appointmentTime: ITimeResponse;
}

export interface IUpdateAppointmentPositionRequest {
  _id: string;
  appointmentDentistId: string;
  appointmentTime: ITimeResponse;
}


interface IAppointmentDataRequest {
  _id: string;  
  appointmentReasonForVisit: string;
  appointmentDate: Date | null | string
  appointmentTime: ITimeRequest;
  appointmentId: string;
}


export type ToothTreatmentPlansType = {
  toothTreatmentId: string;   
  toothCondition: string;     
  toothStatus: string;
}


export type ToothCheckupType = {
  toothNumber: number;      
  toothTreatmentPlans: ToothTreatmentPlansType[];  
}

export type SectionTreatmentPlansType = {
  sectionTreatmentId: string;   
  sectionCondition: string;
  sectionStatus: string;
}

export type SectionCheckupType = {
  sectionName: string;       
  sectionTreatmentPlans: SectionTreatmentPlansType[]; 
}

export type GeneralCheckupType = {
  generalTreatmentId: string;    
  generalNotes: string;
}


export type ToothTreatmentPlansResponseType = {
  toothTreatmentId: ITreatmentDataResponse   
  toothCondition: string;     
  toothStatus: string;
}

export type ToothCheckupResponseType = {
  toothNumber: number;      
  toothTreatmentPlans: ToothTreatmentPlansResponseType[];  
}

export type SectionTreatmentPlansResponseType = {
  sectionTreatmentId: ITreatmentDataResponse;
  sectionCondition: string;
  sectionStatus: string;
}

export type SectionCheckupResponseType = {
  sectionName: string;       
  sectionTreatmentPlans: SectionTreatmentPlansResponseType[]; 
}
export type GeneralCheckupResponseType = {
  generalTreatmentId: ITreatmentDataResponse
  generalStatus: string;
  generalNotes: string;
}


export type DentalCheckupResponseType = {
  checkupAppointmentId: string;
  checkupPatientId: string;
  checkupData: {
    toothCheckup: ToothCheckupResponseType[];   
    sectionCheckup: SectionCheckupResponseType[]; 
    generalCheckup: GeneralCheckupResponseType[];
  }
  agreementDocuments: File[] | AgreementDocumentType[];
}


export type DentalCheckupRequestType = {
  checkupAppointmentId: string;
  checkupPatientId: string;
  checkupData: {
    toothCheckup: ToothCheckupType[];   
    sectionCheckup: SectionCheckupType[]; 
    generalCheckup: GeneralCheckupType[];
  }
  agreementDocuments: File[] | AgreementDocumentType[];
}

export type DentalRecordType = {
  recordPatientId: string;
  recordBloodPressure: {
    mm: number;
    hg: number;
  }
  recordSickness: string[]
  recordAllergies: string[]
  recordOralData:{
    occlusi: string;
    torusPalatinus: string;
    torusMandibularis: string;
    palatum: string;
    anomalousTeeth: string;
    other: string;
  }
  recordHygieneData: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
  },
  updatedAt: string;
}

export interface IAppointmentRequest {
  appointmentData: IAppointmentDataRequest;
  dentistData: IDentistData;
  patientData: IPatientData;
  credentialData: CredentialResponseType;
}


export type PaymentRequestType = {
  appointmentId: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentNotes: string;
  paymentType: string;
  paymentDueDate: Date | undefined | null
  paymentTotalCost: number;
  paymentStatus: string;
  // paymentInstallmentPeriod: {
  //   value: number;
  //   unit: string;
  // }
}

export type PaymentDataType = {
  appointmentId: string;
  amount?: number;
  type: string;
  status?: string;
}

// RESPONSE TYPES
export interface IAppointmentDataResponse {
  _id: string;
  appointmentSerialId: string;
  appointmentReasonForVisit: string;
  appointmentDate: ITimeResponse;
  appointmentStatus: string;
  appointmentDentistId: IDentistResponse
}

export type CredentialResponseType = {
  credentialEmail: string;
  credentialPhoneNumber: string;
}

export interface IPatientDataResponse {
  _id: string;
  patientSerialId: string;
  patientFullName: string;
  patientDateOfBirth: string;
  patientGender: string;
  patientAddress: string;
  patientStatus: string;
  patientAvatar?: string;
}

export interface IPaymentDataResponse {
  paymentStatus: string;
  paymentSerialId: string;
  paymentAmount: number;
  // paymentIntentId: string;
  paymentMethod: string;
  paymentNotes: string;
  paymentTotalCost: number;
  paymentDueDate: Date;
  paymentType: string;
}

export interface IAppointmentResponse {
  appointmentData: IAppointmentDataResponse;
  dentistData: IDentistData;
  patientData: IPatientDataResponse;
  paymentData: IPaymentDataResponse;
  credentialData: CredentialResponseType;
  recordData: DentalRecordType;
}

export type CheckupDataResponseType = {
  _id: string;
  checkupPatientId: IPatientDataResponse;
  checkupAppointmentId: IAppointmentDataResponse;
  checkupTreatmentId: ITreatmentDataResponse;
  checkupType: "Tooth" | "Section" | "General";
  checkupToothNumber: number;
  checkupSection: string;
  checkupCondition: string;
  checkupStatus: string;
  checkupNotes: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type AgreementDocumentType = {
  _id: string;
  documentName: string;
  documentUrl: string;
}

export type AgreementDocumentResponseType = {
  _id: string;
  documentName: string;
  documentUrl: string;
  file: File;
}

export interface ICheckupResponse {
  agreementDocuments: AgreementDocumentType[]
  checkupData: CheckupDataResponseType[];
}

