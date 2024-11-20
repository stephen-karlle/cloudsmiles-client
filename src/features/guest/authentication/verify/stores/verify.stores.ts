import { create } from "zustand";
import { VerifyStoreType } from "../types/verify.types";

export const useVerifyStore = create<VerifyStoreType>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));