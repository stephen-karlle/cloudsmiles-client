import { create } from "zustand";
import { SettingsStoreType } from "../types/store.types";

export const useSettingsStore = create<SettingsStoreType>((set) => ({
  activeBranch: 'profile',
  setActiveBranch: (value) => set({ activeBranch: value }),
  
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}))