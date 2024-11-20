import { z } from "zod";

export const PayPartiallySchema = z.object({
  appointmentId: z.string().min(1, { message: "Appointment ID is required" }),
  paymentAmount: z.number({
    invalid_type_error: "Payment amount must be a number",
    required_error: "Payment amount is required",
  }).min(100, { message: "For partial payments, 100 is the required minimum " }),
  paymentTotalCost: z.number({
    invalid_type_error: "Payment amount must be a number",
    required_error: "Payment amount is required",
  }).min(1, { message: "Total cost is required" }),
  paymentMethod: z.string({
    invalid_type_error: "Payment method must be a string",
    required_error: "Payment method is required",
  }).min(1, { message: "Payment method is required" }),
  paymentStatus: z.string().optional(),
  paymentType: z.string({
    invalid_type_error: "Payment method must be a string",
    required_error: "Payment method is required",
  }).min(1, { message: "Payment method is required" }),
  paymentNotes: z.string({
    invalid_type_error: "Payment notes must be a string",
  }).optional(),
})