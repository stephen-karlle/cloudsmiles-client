import { create } from 'zustand'
import { ITreatmentStore } from '../types/store.types'

export const useTreatmentStore = create<ITreatmentStore>()((set) => ({

  selectedTreatment: {
    treatmentSerialId: "",
    treatmentName: "",
    treatmentCategory: "",
    treatmentDescription: "",
    treatmentCost: 0,
    treatmentDuration: "",
    treatmentChargeType: "",
    treatmentRepetition: "",
    treatmentComponents: [],
    treatmentMedicines: [],
  },
  setSelectedTreatment: (newSelectedTreatment) => set({ selectedTreatment: newSelectedTreatment }),

  activeOutlet: "Active",
  setActiveOutlet: (newActiveOutlet) => set({ activeOutlet: newActiveOutlet }),
  
  activeSheets: [],
  setActiveSheets: (updater) => set((state) => ({
    activeSheets: updater(state.activeSheets)
  })),
  
  isTreatmentDrawerOpen: false,
  setTreatmentDrawerOpen: (newIsTreatmentDrawerOpen) => set({ isTreatmentDrawerOpen: newIsTreatmentDrawerOpen }),

  step: 1,
  setStep: (value) => set(() => ({ step: value })),
    
  treatmentType: "single",
  setTreatmentType: (newTreatmentType) => set({ treatmentType: newTreatmentType }),

}))


