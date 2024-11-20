import { VendorResponseType } from "@features/shared/vendors/types/vendor.types";


export type ProductRequestType = {
  _id: string;
  productAvatar: File | null | string;
  productSku: string;
  productName: string;
  productUnitPrice: number;
  productQuantity: number;
  productCategory: string;
  productDescription: string;
  vendorId: string;
}

export type ProductResponseType = {
  productId: string;
  productAvatar: string;
  productSku: string;
  productName: string;
  productUnitPrice: number;
  productQuantity: number;
  productCategory: string;
  productDescription: string;
  vendorId: VendorResponseType;
  updatedAt: string;
  createdAt: string;
  _id: string;
}

export type IProductDataType = {
  products: ProductResponseType[];
  totalPages: number;
}