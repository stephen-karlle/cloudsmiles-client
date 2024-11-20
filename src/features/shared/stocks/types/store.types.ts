import { OrderResponseType } from "./order.types";
import { ProductResponseType } from "./product.types";

export type StocksStoreType =  { 
  
  selectedProduct: ProductResponseType
  setSelectedProduct: (product: ProductResponseType) => void;
  
  isSkuValid: boolean,
  setSkuValid: (newSku: boolean) => void,

  activeOutlet: "Inventory" | "Order"
  setActiveOutlet: (newActiveOutlet: "Inventory" | "Order") => void;

  isLoading: boolean,
  setIsLoading: (newIsLoading: boolean) => void,

  drawerStates: Record<string, boolean>;
  toggleDrawer: (paymentSerialId: string) => void;
  closeDrawer: () => void;

  selectedOrder: OrderResponseType
  setSelectedOrder: (order: OrderResponseType) => void;
}