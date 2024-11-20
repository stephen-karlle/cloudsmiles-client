import { IActiveSheet, ISheet } from "@components/ui/Drawer";
import { IDentistData, IAppointmentResponse, DentalCheckupRequestType } from "./appointment.types";
import { TreatmentCostsResponseType } from "@features/admin/treatments/types/treatment.types";

interface ITime {
  start: Date;
  end: Date;
}


export interface ITimeSlot {
  time: string;
  id: string;
}

export type SelectedToothType = {
  id: number,
  name: string,
}

export interface ICalendarStore {
  openingTime: number,
  closingTime: number,
  gridColWidth: number;
  lunchBreak: ITime

  activeView: string;
  setActiveView: (view: string) => void;

  date: Date;
  setDate: (date: Date) => void;


  selectedDate: Date;
  setSelectedDate: (date: Date) => void;

  dayGridCols: number;
  setDayGridCols: (length: number) => void;

  appointments: IAppointmentResponse[];
  setAppointments: (appointments: IAppointmentResponse[]) => void;
  updateAppointments: (updater: (prevAppointments: IAppointmentResponse[]) => IAppointmentResponse[]) => void;

  timeSlots: ITimeSlot[];
  setTimeSlots: (timeSlots: ITimeSlot[]) => void;
  updateTimeSlots: (updater: (prevTimeSlots: ITimeSlot[]) => ITimeSlot[]) => void;
}

export interface INewAppointmentStore {
  selectedDentist: IDentistData 
  setSelectedDentist: (dentist: IDentistData) => void;
  selectedTimeIndex: number ;
  setSelectedTimeIndex: (index: number) => void;
  selectedDayIndex: number;
  setSelectedDayIndex: (index: number) => void;
}

export interface IViewAppointmentStore {
  selectedAppointment: IAppointmentResponse;
  setSelectedAppointment: (appointment: IAppointmentResponse) => void;
  resetSelectedAppointment: () => void;

  selectedAppointmentStatus: string | null;
  setSelectedAppointmentStatus: (status: string) => void;
  
  checkups: DentalCheckupRequestType | null;
  setCheckups: (checkups: DentalCheckupRequestType | null) => void;

  isViewDrawerOpen: boolean;
  setViewDrawerOpen: (isOpen: boolean) => void;

  viewActiveSheets: IActiveSheet[];
  setViewActiveSheets: (updater: (sheets: IActiveSheet[]) => IActiveSheet[]) => void;
  clearViewActiveSheets: () => void;

  viewMainSheet: ISheet;
  setViewMainSheet: (viewMainSheet: ISheet) => void;

  viewStep: number;
  setViewStep: (newStep: number) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
    
}

export interface IPaymentAppointmentStore {

  treatmentCost: TreatmentCostsResponseType | null
  setTreatmentCosts: (treatmentCost: TreatmentCostsResponseType | null) => void;

  isPaymentDrawerOpen: boolean;
  setPaymentDrawerOpen: (isOpen: boolean) => void;

  paymentActiveSheets: IActiveSheet[];
  setPaymentActiveSheets: (updater: (sheets: IActiveSheet[]) => IActiveSheet[]) => void;

  paymentMainSheet: ISheet;
  setPaymentMainSheet: (viewMainSheet: ISheet) => void;

  paymentSteps: Record<string, number>;
  setPaymentStep: (method: string, step: number) => void;
  clearPaymentSteps: () => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  cardStates: Record<string, boolean>;
  toggleCard: (paymentMethod: string) => void;
  closeCards: () => void;

  isPaymentModalOpen: boolean;
  setPaymentModalOpen: (isOpen: boolean) => void;
    
}