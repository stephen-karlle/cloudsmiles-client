import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types";


export type PatientStoreType = {
  date: Date;
  setDate: (date: Date) => void;

  appointments: IAppointmentResponse[];
  setAppointments: (appointments: IAppointmentResponse[]) => void;
  updateAppointments: (updater: (prevAppointments: IAppointmentResponse[]) => IAppointmentResponse[]) => void;

  selectedAppointment: IAppointmentResponse;
  setSelectedAppointment: (selectedAppointment: IAppointmentResponse) => void;
}