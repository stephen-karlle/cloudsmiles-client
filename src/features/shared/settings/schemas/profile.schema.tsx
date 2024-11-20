import { z } from "zod";


export const ProfileSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  profileAvatar: z.any(),
  profileFullName: z.string().min(1, { message: 'Full name is required' }),
  profileGender: z.string().min(1, { message: 'Gender is required' }),
  profileDateOfBirth: z.string({required_error: "Date of birth is required" }),
  profileAddress: z.string().min(1, { message: 'Address is required' }),
  profileEmail: z.string().email({ message: 'Invalid email address' }),
  profilePhoneNumber: z.string().min(1, { message: 'Phone number is required' }),
})

export const SecuritySchema = z.object({
  oldPassword: z.string().min(12, { message: 'Old password must be at least 12 characters' }),
  newPassword: z
    .string()
    .min(12, { message: 'New password must be at least 16 characters' })
    .regex(/[A-Z]/, { message: 'New password must include at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'New password must include at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'New password must include at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'New password must include at least one special character' }),
  confirmPassword: z
    .string()
    .min(12, { message: 'Confirm password must be at least 16 characters' })
    .regex(/[A-Z]/, { message: 'Confirm password must include at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Confirm password must include at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Confirm password must include at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Confirm password must include at least one special character' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Password do not match',
  path: ['confirmPassword'],
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: 'New password must be different from old password',
  path: ['newPassword'],
})