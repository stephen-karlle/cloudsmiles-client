import { ISchedule, IScheduleResponse } from "./schedule.types";

export interface AssistantType {
  assistantId: string;
  assistantAvatar: File | null | string
  assistantGender: string;
  assistantDateOfBirth: string | Date | null;
  assistantEmploymentType: string;
  assistantFullName: string;
  assistantPhoneNumber: string;
  assistantEmail: string;
  assistantAddress: string;
  assistantRole: string;
  assistantSchedule: ISchedule[];
}




export interface AssistantResponseType {
  _id: string;
  assistantAvatar: string
  assistantEmploymentType: string;
  assistantFullName: string;
  assistantGender: string;
  assistantDateOfBirth: string | Date
  assistantAddress: string;
  assistantScheduleId: IScheduleResponse;
  assistantRole: string;
  assistantCredentialId: {
    credentialPhoneNumber: string;
    credentialEmail: string;
  }
  createdAt: string;
}
