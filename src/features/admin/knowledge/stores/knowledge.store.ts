import { create } from 'zustand'
import { IKnowledgeStore } from '../types/store.types'
 

export const useKnowledgeStore = create<IKnowledgeStore>()((set) => ({

  selectedContext: null,
  setSelectedContext: (newSelectedContext) => set({ selectedContext: newSelectedContext }),

  selectedRequest: null,
  setSelectedRequest: (newSelectedRequest) => set({ selectedRequest: newSelectedRequest }),

  activeOutlet: "Context",
  setActiveOutlet: (newActiveOutlet) => set({ activeOutlet: newActiveOutlet }),

  mainSheet: { name: "MainSheet1", component: null },
  setMainSheet: (newMainSheet) => set({ mainSheet: newMainSheet }),

  activeSheets: [],
  setActiveSheets: (updater) => set((state) => ({
    activeSheets: updater(state.activeSheets)
  })),
  

  isKnowledgeDrawerOpen: false,
  setKnowledgeDrawerOpen: (newIsKnowledgeDrawerOpen) => set({ isKnowledgeDrawerOpen: newIsKnowledgeDrawerOpen }),

  step: 0,
  setStep: (value) => set({ step: value }),

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

}))