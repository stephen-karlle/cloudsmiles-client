import { create } from "zustand";
import { SignUpStoreType } from "../types/stores.types";


export const useSignUpStore = create<SignUpStoreType>()((set) => ({

  activeTab: "Credential",
  setActiveTab: (activeTab: string) => set({ activeTab }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isLoading: false,
}))