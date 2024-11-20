import { create } from 'zustand'
import { AuthStoreType } from '../types/store.types'


export const useAuthStore = create<AuthStoreType>()((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}))