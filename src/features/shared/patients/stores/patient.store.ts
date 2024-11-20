import { create } from 'zustand'
import { IPatientStore } from '../types/store.types'
import { patientProfileDefaultValues } from '../constants/default.constants'
 

export const usePatientStore = create<IPatientStore>()((set) => ({
  activeOutlet: "Patient",
  setActiveOutlet: (newActiveOutlet) => set({ activeOutlet: newActiveOutlet }),

  selectedPatient: {
    _id: "",
    patientAvatar: "",
    patientFullName: "",
    patientDateOfBirth: "",
    patientGender: "",
    patientSerialId: "",
    patientAddress: "",
    patientStatus: "Verified",
    patientCredentialId: {
      credentialEmail: "",
      credentialPhoneNumber: "",
    },
    createdAt: "",
  },
  setSelectedPatient: (newSelectedPatient) => set({ selectedPatient: newSelectedPatient }),

  selectedProfile: patientProfileDefaultValues,
  setSelectedProfile: (newSelectedProfile) => set({ selectedProfile: newSelectedProfile }),

  mainSheet: { name:"MainSheet1", component: null },
  setMainSheet: (newMainSheet) => set({ mainSheet: newMainSheet }),
  
  activeSheets: [],
  setActiveSheets: (updater) => set((state) => ({
    activeSheets: updater(state.activeSheets)
  })),

  checkups: [],
  setCheckups: (checkups) => set({ checkups }),

  selectedService: {
    id: 0,
    name: "",
    type: "Tooth",
  },
  setSelectedService: (newSelectedService) => set({ selectedService: newSelectedService }),


  isPatientDrawerOpen: false,
  setPatientDrawerOpen: (newIsPatientDrawerOpen) => set({ isPatientDrawerOpen: newIsPatientDrawerOpen }),

  step: 0,
  setStep: (value) => set({ step: value }),

  isLoading: false,
  setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),

  activeBranch: "Information",
  setActiveBranch: (newActiveBranch) => set({ activeBranch: newActiveBranch }),

  totalPatients: 0,
  setTotalPatients: (newTotalPatients) => set({ totalPatients: newTotalPatients }),

}))