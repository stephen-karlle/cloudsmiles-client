import { ISchedule } from "./schedule.types";



export interface INewDentist {
  dentistAvatar: File | null | string
  dentistGender: string;
  dentistDateOfBirth: Date | string | null
  dentistEmploymentType: string;
  dentistFullName: string;
  dentistSpecialization: string;
  dentistPhoneNumber: string;
  dentistEmail: string;
  dentistAddress: string;
  dentistMedicalServices: string[];
  dentistCosmeticServices: string[];
  dentistSchedule: ISchedule[];
}

export interface ICurrentDentist extends INewDentist {
  dentistId: string;
}

interface IScheduleResponse {
  schedules: ISchedule[];
}

export interface IDentistResponse {
  _id: string;
  dentistAvatar: string;
  dentistGender: string;
  dentistDateOfBirth: Date | string;
  dentistEmploymentType: string;
  dentistFullName: string;
  dentistSpecialization: string;
  dentistAddress: string;
  dentistMedicalServices: string[];
  dentistCosmeticServices: string[];
  dentistScheduleId: IScheduleResponse;
  dentistCredentialId: {
    credentialEmail: string;
    credentialPhoneNumber: string;
  }
  createdAt: string;
  updatedAt: string;
}
