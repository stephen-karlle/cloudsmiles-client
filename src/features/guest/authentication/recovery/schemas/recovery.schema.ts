import { z } from "zod";

export const RecoverySchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
  newPassword: z
    .string({
      required_error: 'New password is required',
    })
    .min(12, { message: 'Password must be at least 12 characters' })
    .regex(/[A-Z]/, { message: 'Password must have an uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must have a lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must have a number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must have a special character' }),
  confirmPassword: z
    .string({
      required_error: 'Confirm password is required',
    })
    .min(12, { message: 'Confirm password must be at least 12 characters' })
    .regex(/[A-Z]/, { message: 'Confirm password must have an uppercase letter' })
    .regex(/[a-z]/, { message: 'Confirm password must have a lowercase letter' })
    .regex(/[0-9]/, { message: 'Confirm password must have a number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Confirm password must have a special character' }),

}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Password do not match',
  path: ['confirmPassword'],
});