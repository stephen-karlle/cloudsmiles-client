
import { UserStoreType } from '@interfaces/store.types'
import { create } from 'zustand'

const defaultUser = {
  _id: "",
  avatar: "",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  phoneNumber:"",
  email: "",
  role: "",
}

export const useUserStore = create<UserStoreType>()((set) => ({
  user:defaultUser,
  setUser: (newUser) => set({ user: newUser }),
  clearUser: () => set({ user: defaultUser }),

}))