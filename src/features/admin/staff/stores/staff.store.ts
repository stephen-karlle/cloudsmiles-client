import { create } from 'zustand'
import { IStaffStore } from '../types/store.types'
 

export const useStaffStore = create<IStaffStore>()((set) => ({
  selectedDentist: {
    _id: "",
    dentistAvatar: "",
    dentistGender: "",
    dentistDateOfBirth: "",
    dentistEmploymentType: "",
    dentistFullName: "",
    dentistSpecialization: "",
    dentistCredentialId:{
      credentialPhoneNumber: "",
      credentialEmail: ""
    },
    dentistAddress: "",
    dentistMedicalServices: [],
    dentistCosmeticServices: [],
    dentistScheduleId: {
      schedules: []
    },
    dentistRatings: 0,
    dentistReviews: 0,
    createdAt: "",
    updatedAt: "",  
  },
  setSelectedDentist: (newSelectedDentist) => set({ selectedDentist: newSelectedDentist }),

  selectedAssistant: {
    _id: "",
    assistantAvatar: "",
    assistantDateOfBirth: "",
    assistantGender: "",
    assistantEmploymentType: "",
    assistantFullName: "",
    assistantAddress: "",
    assistantScheduleId: {
      schedules: []
    },
    assistantCredentialId: {
      credentialPhoneNumber: "",
      credentialEmail: ""
    },
    assistantRole: "",
    createdAt: "",
  },
  setSelectedAssistant: (newSelectedAssistant) => set({ selectedAssistant: newSelectedAssistant }),

  activeOutlet: "Dentist",
  setActiveOutlet: (newActiveOutlet) => set({ activeOutlet: newActiveOutlet }),

  mainSheet: { name: "MainSheet1", component: null },
  setMainSheet: (newMainSheet) => set({ mainSheet: newMainSheet }),

  activeSheets: [],
  setActiveSheets: (updater) => set((state) => ({
    activeSheets: updater(state.activeSheets)
  })),
  

  isStaffDrawerOpen: false,
  setStaffDrawerOpen: (newIsStaffDrawerOpen) => set({ isStaffDrawerOpen: newIsStaffDrawerOpen }),

  step: 1,
  setStep: (value) => set(() => ({ step: value })),


  isLoading: false,
  setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),
  

}))
