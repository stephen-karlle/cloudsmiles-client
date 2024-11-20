import { IActiveSheet, ISheet } from "@components/ui/Drawer";
import { IDentistResponse } from "./dentists.types";
import { AssistantResponseType } from "./assistant.types";

export interface IStaffStore { 
  activeOutlet: "Dentist" | "Assistant" ;
  setActiveOutlet: (newActiveOutlet: "Dentist" | "Assistant") => void;

  selectedDentist: IDentistResponse;
  setSelectedDentist: (newSelectedDentist: IDentistResponse) => void;

  selectedAssistant: AssistantResponseType;
  setSelectedAssistant: (newSelectedAssistant: AssistantResponseType) => void;

  mainSheet: ISheet;
  setMainSheet: (newMainSheet: ISheet) => void;

  activeSheets: IActiveSheet[];
  setActiveSheets: (updater: (prevSheets: IActiveSheet[]) => IActiveSheet[]) => void;
  
  isStaffDrawerOpen: boolean;
  setStaffDrawerOpen: (newIsStaffDrawerOpen: boolean) => void;
 
  step: number;
  setStep: (value: number) => void;

  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void;

}