import { IActiveSheet } from "@components/ui/Drawer";
import { TreatmentRequestType } from "./treatment.types";


export interface ITreatmentStore { 

  selectedTreatment: TreatmentRequestType
  setSelectedTreatment: (newSelectedTreatment: TreatmentRequestType) => void;
  activeOutlet: "Active" | "Inactive" ;
  setActiveOutlet: (newActiveOutlet: "Active" | "Inactive") => void;

  activeSheets: IActiveSheet[];
  setActiveSheets: (updater: (prevSheets: IActiveSheet[]) => IActiveSheet[]) => void;
  
  isTreatmentDrawerOpen: boolean;
  setTreatmentDrawerOpen: (isTreatmentDrawerOpen: boolean) => void;
 
  step: number;
  setStep: (value: number) => void;
  
  treatmentType: string;
  setTreatmentType: ( newTreatmentType: string) => void;
}

