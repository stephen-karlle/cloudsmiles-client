import { IPatientDataResponse, ITimeResponse } from "@features/shared/calendar/types/appointment.types";


export type PaymentResponseType = {
  paymentStatus: string;
  paymentAppointmentId: {
    appointmentDate: ITimeResponse
    appointmentPatientId: IPatientDataResponse
    appointmentSerialId: string
    createdAt: string
    _id: string
  }
  paymentSerialId: string;
  paymentAmount: number;
  // paymentIntentId: string;
  paymentMethod: string;
  paymentNotes: string;
  paymentTotalCost: number;
  paymentDueDate: Date;
  paymentHistory: Omit<PaymentResponseType, 'paymentHistory'>[]; 
  createdAt: string;
  updatedAt: string;
}

export type PaymentAnalyticsType = {
  profit: {
    value: number;
    isUpTrend: boolean;
    percentage: string;
  }
  revenue: {
    value: number;
    isUpTrend: boolean;
    percentage: string;
  }
}
