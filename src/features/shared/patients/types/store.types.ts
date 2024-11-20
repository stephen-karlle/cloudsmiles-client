import { IActiveSheet } from "@components/ui/Drawer";
import { PatientProfileResponseType, PatientResponseType } from "./patient.types";
import { CheckupDataResponseType } from "@features/shared/calendar/types/appointment.types";

export interface IPatientStore { 
  activeOutlet: string ;
  setActiveOutlet: (newActiveOutlet: string) => void;

  selectedPatient: PatientResponseType;
  setSelectedPatient: (newSelectedPatient: PatientResponseType) => void;

  selectedProfile: PatientProfileResponseType 
  setSelectedProfile: (newSelectedProfile: PatientProfileResponseType) => void;

  mainSheet: IActiveSheet;
  setMainSheet: (newMainSheet: IActiveSheet) => void;

  checkups: CheckupDataResponseType[];
  setCheckups: (checkups: CheckupDataResponseType[]) => void;

  selectedService: {
    id: number | string;
    type: string;
    name: string;
  }

  setSelectedService: (newSelectedService: { id: number | string, type: string; name: string }) => void;
 
  activeSheets: IActiveSheet[];
  setActiveSheets: (updater: (prevSheets: IActiveSheet[]) => IActiveSheet[]) => void;
  
  isPatientDrawerOpen: boolean;
  setPatientDrawerOpen: (newIsPatientDrawerOpen: boolean) => void;
 
  step: number;
  setStep: (value: number) => void;

  isLoading: boolean;
  setIsLoading: (newLoading: boolean) => void;

  activeBranch: string;
  setActiveBranch: (newActiveBranch: string) => void;

  totalPatients: number;
  setTotalPatients: (newTotalPatients: number) => void;
  

}