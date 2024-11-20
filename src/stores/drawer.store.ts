
import { DrawerStoreType } from '@interfaces/drawer.types'
import { create } from 'zustand'


export const useDrawerStore = create<DrawerStoreType>()((set) => ({

  activeSheets: [],
  setActiveSheets: (updater) => set((state) => ({
    activeSheets: updater(state.activeSheets)
  })),
  
  isDrawerOpen: false,
  setDrawerOpen: (newIsDrawerOpen) => set({ isDrawerOpen: newIsDrawerOpen }),

  isExtraDrawerOpen: false,
  setExtraDrawerOpen: (newIsExtraDrawerOpen) => set({ isExtraDrawerOpen: newIsExtraDrawerOpen }),

  mainSheet: { name: "", component: null },
  setMainSheet: (sheet) => set({ mainSheet: sheet }),

  step: 1,
  setStep: (value) => set(() => ({ step: value })),

  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),

  
  drawerStates: {},
  toggleDrawer: (id) => set((state) => ({
    drawerStates: {
      [id]: !state.drawerStates[id],
    },
  })),
  closeDrawer: () => set({ drawerStates: {} }),

  
}))