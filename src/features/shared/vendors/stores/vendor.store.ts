
import { create } from 'zustand'
import { VendorStoreType } from '../types/store.types'


export const useVendorStore = create<VendorStoreType>()((set) => ({

  selectedVendor: {
    _id: "",
    vendorSerialId: "",
    vendorCompanyName: "",
    vendorContactPerson: "",
    vendorEmail: "",
    vendorPhoneNumber: "",
    vendorAddress: "",
    vendorAvatar: "",
    vendorType: "",
    createdAt: "",
    updatedAt: "",
  },
  setSelectedVendor: (newSelectedVendor) => set({ selectedVendor: newSelectedVendor }),
}))
