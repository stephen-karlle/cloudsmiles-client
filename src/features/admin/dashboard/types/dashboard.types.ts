import { ITimeResponse } from "@features/shared/calendar/types/appointment.types";
import { PaymentResponseType } from "@features/shared/payments/types/payment.types"
import { IDentistResponse } from "@features/admin/staff/types/dentists.types";
import { ProductResponseType } from "@features/shared/stocks/types/product.types"
import { PatientResponseType } from "@features/shared/patients/types/patient.types";

export type  AppointmentType =  {
  _id: string;
  appointmentSerialId: string;
  appointmentReasonForVisit: string;
  appointmentDate: ITimeResponse;
  appointmentStatus: string;
  appointmentDentistId: IDentistResponse
  appointmentPatientId: PatientResponseType
}

export type VisitData = {
  name: string,
  visit: number
}

export type PaymentData = {
  name: string,
  paid: number
  partial: number
}


export type DashboardVisitType = {
  visits: AppointmentType[],
  totalVisits: number,
  data: VisitData[]
}

export type AppointmentChartData = {
  name: string,
  value: number
}

export type StocksChartData = {
  status: string,
  value: number
}

export type DashboardPatientType = {
  patients: PatientResponseType[],
  totalPatients: number,
  newPatients: {
    value: number,
    percentage: number
  },
  oldPatients: {
    value: number,
    percentage: number
  }
}

export type DashboardPaymentType = {
  payments: PaymentResponseType[],
  totalRevenue: number,
  data: PaymentData[],
  partialPayments: number,
  paidPayments: number
}

export type DashboardAppointmentType = {
  appointments: AppointmentType[],
  totalAppointments: number,
  data: AppointmentChartData[],
}


export type DashboardStockType = {
  products: ProductResponseType[],
  lowStock: ProductResponseType,
  totalProducts: number,
  totalValue: number,
  data: StocksChartData[]
}