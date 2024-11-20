import { create } from 'zustand'
import { PaymentStoreType } from '../types/store.types'
import { paymentStepsDefaultValues } from '@features/shared/calendar/constants/default.constants'

export const usePaymentStore = create<PaymentStoreType>()((set) => ({

  selectedPayment: {
    paymentStatus: "",
    paymentDueDate: new Date(),
    paymentAppointmentId: {
      appointmentDate: {
        start: "",
        end: ""
      },
      appointmentPatientId: {
        _id: "",
        patientSerialId: "",
        patientFullName: "",
        patientDateOfBirth: "",
        patientGender: "",
        patientAddress: "",
        patientStatus: "",
        patientAvatar: undefined 
      },
      appointmentSerialId: "",
      createdAt: "",
      updatedAt: "",
      _id: ""
    },
    createdAt: "",
    updatedAt: "",
    paymentSerialId: "",
    paymentAmount: 0,
    // paymentIntentId: "", // uncomment if needed
    paymentMethod: "",
    paymentNotes: "",
    paymentTotalCost: 0,
    paymentHistory: [],
  },
  
  setSelectedPayment: (payment) => set({ selectedPayment: payment }),

  drawerStates: {},
  toggleDrawer: (paymentSerialId) => set((state) => ({
    drawerStates: {
      [paymentSerialId]: !state.drawerStates[paymentSerialId],
    },
  })),
  closeDrawer: () => set({ drawerStates: {} }),

  cardStates: {},
  toggleCard: (paymentMethod) => set((state) => ({
    cardStates: {
      [paymentMethod]: !state.cardStates[paymentMethod],
    },
  })),
  closeCards: () => set({ cardStates: {} }),

  modalStates: {},
  toggleModal: (paymentSerialId) => set((state) => ({
    modalStates: {
      [paymentSerialId]: !state.modalStates[paymentSerialId],
    },
  })),
  closeModal: () => set({ modalStates: {} }),

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

}))