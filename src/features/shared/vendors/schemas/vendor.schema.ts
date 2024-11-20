import { z } from "zod";

export const NewVendorSchema = z.object({
  vendorAvatar: z.instanceof(File).optional(),
  vendorAddress: z.string().min(1,{ message: "Address is required" }),
  vendorCompanyName: z.string().min(1, { message: "Company Name is required" }),
  vendorType: z.string().min(1,{ message: "Type is required" }),
  vendorContactPerson: z.string().min(1, { message: "Contact Person is required" }),
  vendorEmail: z.string().min(1, { message: "Email is required"}).email({ message: "Invalid Email" }),
  vendorPhoneNumber: z.string().min(1, { message: "Phone Number is required"}).length(11, { message: "Invalid Phone Number" }),
})

export const EditVendorSchema = z.object({
  _id: z.string().min(1, { message: "ID is required" }),
  vendorAvatar: z.any(),
  vendorAddress: z.string().min(1,{ message: "Address is required" }),
  vendorCompanyName: z.string().min(1, { message: "Company Name is required" }),
  vendorType: z.string().min(1,{ message: "Type is required" }),
  vendorContactPerson: z.string().min(1, { message: "Contact Person is required" }),
  vendorEmail: z.string().min(1, { message: "Email is required"}).email({ message: "Invalid Email" }),
  vendorPhoneNumber: z.string().min(1, { message: "Phone Number is required"}).length(11, { message: "Invalid Phone Number" }),
})