import { VendorResponseType } from "@features/shared/vendors/types/vendor.types";
import { ProductResponseType } from "./product.types";

export type OrderType = {
  orderId: string;
  orderVendorId: string;
  orderProducts: ProductResponseType[];
  orderNotes?: string;
  orderSendEmail: boolean;
  orderStatus: string;
}


export type OrderProductResponseType = {
  productId: ProductResponseType
  productQuantity: number;
  productStatus: string;
  productReceived: number;
}


export type OrderProductRequestType = {
  productId: string;
  productQuantity: number;
  productStatus: string;
  productReceived: number;
}

export type OrderResponseType = {
  _id: string;
  orderVendorId: VendorResponseType;
  orderProducts: OrderProductResponseType[]
  orderNotes?: string;
  orderSendEmail: boolean;
  orderSerialId: string;
  orderStatus: string;
  createdAt: string;
}

export type OrderReceiveType = {
  orderId: string;
  orderProducts: OrderProductRequestType[];
  orderStatus: string;
}