import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types";
import { ITime } from "@interfaces/calendar.types";


export type DentistCalendarStore = {
  openingTime: number,
  closingTime: number,
  gridColWidth: number;
  lunchBreak: ITime

  date: Date;
  setDate: (date: Date) => void;


  appointments: IAppointmentResponse[];
  setAppointments: (appointments: IAppointmentResponse[]) => void;
  updateAppointments: (updater: (prevAppointments: IAppointmentResponse[]) => IAppointmentResponse[]) => void;

  selectedAppointment: IAppointmentResponse;
  setSelectedAppointment: (selectedAppointment: IAppointmentResponse) => void;

}