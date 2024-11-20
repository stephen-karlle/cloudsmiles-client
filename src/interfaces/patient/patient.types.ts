import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types";
import { PatientResponseType } from "@features/shared/patients/types/patient.types";


export interface IPatientStore {
  patient: PatientResponseType | null;
  setPatient: (patient: PatientResponseType | null) => void;

  selectedAppointment: IAppointmentResponse | null;
  setSelectedAppointment: (appointment: IAppointmentResponse | null) => void;

  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

}


