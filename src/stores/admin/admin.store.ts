import { create } from 'zustand'
import { IAdminStore } from '@interfaces/admin/admin.types'


export const useAdminStore = create<IAdminStore>()((set) => ({
  activePage: "Dashboard",
  setActivePage: (newActivePage) => set({ activePage: newActivePage }),
  
  isDrawerOpen: false,
  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  
  activeSheets: [],
  setActiveSheets: (updater) => set((state) => ({
    activeSheets: updater(state.activeSheets)
  })),

  mainSheet: { name: "", component: null },
  setMainSheet: (mainSheet) => set({ mainSheet }),
  
  step: 1,
  setStep: (newStep) => set({ step: newStep }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  activeOutlet: "",
  setActiveOutlet: (outlet) => set({ activeOutlet: outlet }),
  
}))