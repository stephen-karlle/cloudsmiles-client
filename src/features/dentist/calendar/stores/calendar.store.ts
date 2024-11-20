import { create } from "zustand";
import { DentistCalendarStore } from "../types/store.types";
import { selectedAppointmentDefaultValues } from "@features/shared/calendar/constants/default.constants";


export const useDentistCalendarStore = create<DentistCalendarStore>()((set) => ({
  // Constants
  openingTime: 9,
  closingTime: 19,
  gridColWidth: 500,
  lunchBreak: {
    start: new Date(2024, 4, 5, 13,0),
    end: new Date(2024, 4, 5, 14,0),
  },

  date: new Date(),
  setDate: (date: Date) => set({ date }),

  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  updateAppointments: (updater) => set((state) => ({
    appointments: updater(state.appointments)
  })),

  selectedAppointment: selectedAppointmentDefaultValues,
  setSelectedAppointment: (selectedAppointment) => set({ selectedAppointment }),


}))