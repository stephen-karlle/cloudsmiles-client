
export type VendorRequestType = {
  _id: string;
  vendorAvatar: File | null | string;
  vendorSerialId: string;
  vendorContactPerson: string;
  vendorType: string;
  vendorCompanyName: string;
  vendorEmail: string;
  vendorPhoneNumber: string;
  vendorAddress: string;
  createdAt: string;
  updatedAt: string;
}

export type VendorResponseType = {
  _id: string;
  vendorAvatar: string;
  vendorSerialId: string;
  vendorContactPerson: string;
  vendorCompanyName: string;
  vendorType: string;
  vendorEmail: string;
  vendorPhoneNumber: string;
  vendorAddress: string;
  createdAt: string;
  updatedAt: string;
}
