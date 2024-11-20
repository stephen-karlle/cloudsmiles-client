import { IActiveSheet, ISheet } from "@components/ui/Drawer"


export interface IAdminStore {
  activePage: string
  setActivePage: (newActivePage: string) => void

  isDrawerOpen: boolean
  setDrawerOpen: (isOpen: boolean) => void

  activeSheets: IActiveSheet[]
  setActiveSheets: (updater: (sheets: IActiveSheet[]) => IActiveSheet[]) => void

  mainSheet: ISheet
  setMainSheet: (mainSheet: ISheet) => void
   
  step: number;
  setStep: (value: number) => void;
  
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  activeOutlet: string;
  setActiveOutlet: (outlet: string) => void;
}