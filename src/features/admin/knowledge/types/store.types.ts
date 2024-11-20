import { IActiveSheet, ISheet } from "@components/ui/Drawer";
import { ContextResponseType, RequestResponseType } from "./context.types";

export interface IKnowledgeStore { 

  selectedContext: ContextResponseType | null;
  setSelectedContext: (newSelectedContext: ContextResponseType | null) => void;

  selectedRequest: RequestResponseType | null;
  setSelectedRequest: (newSelectedRequest: RequestResponseType | null) => void;

  activeOutlet: "Context" | "Request" ;
  setActiveOutlet: (newActiveOutlet: "Context" | "Request") => void;

  mainSheet: ISheet;
  setMainSheet: (newMainSheet: ISheet) => void;

  activeSheets: IActiveSheet[];
  setActiveSheets: (updater: (prevSheets: IActiveSheet[]) => IActiveSheet[]) => void;
  
  isKnowledgeDrawerOpen: boolean;
  setKnowledgeDrawerOpen: (newIsKnowledgeDrawerOpen: boolean) => void;
 
  step: number;
  setStep: (value: number) => void;
  
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  

}