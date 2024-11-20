
import { create } from 'zustand'
import { StocksStoreType } from '../types/store.types'


export const useStocksStore = create<StocksStoreType>()((set) => ({
  isSkuValid: false,
  setSkuValid: (newSku) => set({ isSkuValid: newSku }),

  selectedProduct: {
    _id: "",
    productId: "",
    productAvatar: "",
    productSku: "",
    productName: "",
    productUnitPrice: 0,
    productQuantity: 0,
    productCategory: "",
    productDescription: "",
    vendorId: {
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
    createdAt: "",
    updatedAt: "",
  },
  setSelectedProduct: (newSelectedProduct) => set({ selectedProduct: newSelectedProduct }),
  
  activeOutlet: "Inventory",
  setActiveOutlet: (newActiveOutlet) => set({ activeOutlet: newActiveOutlet }),

  isLoading: false,
  setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),
  
  drawerStates: {},
  toggleDrawer: (paymentSerialId) => set((state) => ({
    drawerStates: {
      [paymentSerialId]: !state.drawerStates[paymentSerialId],
    },
  })),
  closeDrawer: () => set({ drawerStates: {} }),

  selectedOrder: {
    _id: "",
    orderSerialId: "",
    orderVendorId: {
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
    orderProducts: [],
    orderNotes: "",
    orderSendEmail: false,
    orderStatus: "",
    createdAt: "",
  },
  setSelectedOrder: (newSelectedOrder) => set({ selectedOrder: newSelectedOrder }),

}))
