import { IActiveSheet } from "@components/ui/Drawer";


export type DrawerStoreType = {  
  activeSheets: IActiveSheet[];
  setActiveSheets: (updater: (prevSheets: IActiveSheet[]) => IActiveSheet[]) => void;
    
  isDrawerOpen: boolean;
  setDrawerOpen: (newIsDrawerOpen: boolean) => void;

  isExtraDrawerOpen: boolean;
  setExtraDrawerOpen: (newIsDrawerOpen: boolean) => void;
  
  mainSheet: IActiveSheet;
  setMainSheet: (newMainSheet: IActiveSheet) => void;
  
  step: number;
  setStep: (value: number) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  drawerStates: Record<string, boolean>;
  toggleDrawer: (id: string) => void;
  closeDrawer: () => void;

}