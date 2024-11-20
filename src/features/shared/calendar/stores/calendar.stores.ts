import { create } from 'zustand'
import { ICalendarStore } from '../types/store.types'
 

export const useCalendarStore = create<ICalendarStore>()((set) => ({
  // Constants
  openingTime: 9,
  closingTime: 19,
  gridColWidth: 500,
  lunchBreak: {
    start: new Date(2024, 4, 5, 13,0),
    end: new Date(2024, 4, 5, 14,0),
  },

  activeView: "Day",
  setActiveView: (view: string) => set({ activeView: view }),
  
  // Grid Columns
  dayGridCols: 0,
  setDayGridCols: (length: number) => set({ dayGridCols: length }),

  // Date selected on the calendar
  date: new Date(),
  setDate: (date: Date) => set({ date }),

  selectedDate : new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),

  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  updateAppointments: (updater) => set((state) => ({
    appointments: updater(state.appointments)
  })),


  // Time Slots
  timeSlots: [],
  setTimeSlots: (timeSlots) => set({ timeSlots }),
  updateTimeSlots: (updater) => set((state) => ({
    timeSlots: updater(state.timeSlots)
  })),
}))