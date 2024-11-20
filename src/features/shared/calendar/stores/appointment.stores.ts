import { create } from 'zustand'
import { INewAppointmentStore, IPaymentAppointmentStore, IViewAppointmentStore } from '../types/store.types'
import { dentistDefaultValues, paymentStepsDefaultValues, selectedAppointmentDefaultValues } from '../constants/default.constants'
 

export const useNewAppointmentStore = create<INewAppointmentStore>()((set) => ({
  selectedDentist: dentistDefaultValues,
  setSelectedDentist: (dentist) => set(() => ({ selectedDentist: dentist })),

  selectedTimeIndex: 0,
  setSelectedTimeIndex: (index) => set(() => ({ selectedTimeIndex: index })),

  selectedDayIndex: 0,
  setSelectedDayIndex: (index) => set(() => ({ selectedDayIndex: index })),

}))

export const useViewAppointmentStore = create<IViewAppointmentStore>()((set) => ({
  selectedAppointment: selectedAppointmentDefaultValues,
  setSelectedAppointment: (appointment) => set(() => ({ selectedAppointment: appointment })),
  resetSelectedAppointment: () => set(() => ({ selectedAppointment: selectedAppointmentDefaultValues })),

  selectedAppointmentStatus: null,
  setSelectedAppointmentStatus: (status) => set(() => ({ selectedAppointmentStatus: status })),
  
  
  checkups: null,
  setCheckups: (checkups) => set(() => ({ checkups })),
  
  isViewDrawerOpen: false,
  setViewDrawerOpen: (isOpen) => set({ isViewDrawerOpen: isOpen }),
  
  viewActiveSheets: [],
  setViewActiveSheets: (updater) => set((state) => ({
    viewActiveSheets: updater(state.viewActiveSheets)
  })),
  clearViewActiveSheets: () => set({ viewActiveSheets: [] }),
  
  viewMainSheet: { name: "", component: null },
  setViewMainSheet: (viewMainSheet) => set({ viewMainSheet }),

  viewStep: 1,
  setViewStep: (newStep) => set({ viewStep: newStep }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  

}))

export const usePaymentAppointmentStore = create<IPaymentAppointmentStore>()((set) => ({

  treatmentCost: [],
  setTreatmentCosts: (treatmentCost) => set({ treatmentCost }),
  
  isPaymentDrawerOpen: false,
  setPaymentDrawerOpen: (isOpen) => set({ isPaymentDrawerOpen: isOpen }),
  
  paymentActiveSheets: [],
  setPaymentActiveSheets: (updater) => set((state) => ({
    paymentActiveSheets: updater(state.paymentActiveSheets)
  })),
  
  paymentMainSheet: { name: "", component: null },
  setPaymentMainSheet: (paymentMainSheet) => set({ paymentMainSheet }),

  
  paymentSteps: paymentStepsDefaultValues,
  setPaymentStep: (method, step) => set((state) => ({
    paymentSteps: {
      ...state.paymentSteps,
      [method]: step,
    },
  })),
  clearPaymentSteps: () => set({ paymentSteps: paymentStepsDefaultValues }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  cardStates: {},
  toggleCard: (paymentMethod) => set((state) => ({
    cardStates: {
      [paymentMethod]: !state.cardStates[paymentMethod],
    },
  })),
  closeCards: () => set({ cardStates: {} }),

  isPaymentModalOpen: false,
  setPaymentModalOpen: (isOpen) => set({ isPaymentModalOpen: isOpen }),

}))