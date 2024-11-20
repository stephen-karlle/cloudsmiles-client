import { z } from "zod";

export const VerifySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z.string().min(6, { message: 'OTP must be at least 6 characters' }),
})