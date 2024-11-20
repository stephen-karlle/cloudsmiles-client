import { create } from "zustand";
import { RecoveryStoreType } from "../types/store.types";

export const useRecoveryStore = create<RecoveryStoreType>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),

  isSuccess: false,
  setIsSuccess: (isSuccess) => set({ isSuccess }),
  
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

