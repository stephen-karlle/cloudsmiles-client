import { VendorResponseType } from "./vendor.types"


export type VendorStoreType = {
  selectedVendor: VendorResponseType
  setSelectedVendor: (newSelectedVendor: VendorResponseType) => void
}