import { create } from 'zustand'
import { PatientStoreType } from '../types/store.types'
import { selectedAppointmentDefaultValues } from '@features/shared/calendar/constants/default.constants'

export const usePatientStore = create<PatientStoreType>()((set) => ({

  date: new Date(),
  setDate: (date) => set({ date }),

  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  updateAppointments: (updater) => set((state) => ({
    appointments: updater(state.appointments)
  })),

  selectedAppointment: selectedAppointmentDefaultValues,
  setSelectedAppointment: (selectedAppointment) => set({ selectedAppointment }),

}))
