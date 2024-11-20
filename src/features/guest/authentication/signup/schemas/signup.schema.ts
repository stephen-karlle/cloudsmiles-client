import { z } from 'zod';



export const NewPatientSchema = z.object({

  credentialData: z.object({
    credentialEmail: z.string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    }).email({ message: "Email is not valid" }),
    credentialPhoneNumber: z.string({  
      invalid_type_error: "Phone number must be a string",
      required_error: "Phone number is required",
    }).min(10, { message: "Phone number must be at least 10 characters" }),
    credentialPassword:     
      z.string({
        required_error: 'New password is required',
      })
      .min(12, { message: 'Password must be at least 12 characters' })
      .regex(/[A-Z]/, { message: 'Password must have an uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must have a lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must have a number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must have a special character' }),
    credentialConfirmPassword: z
      .string({
        required_error: 'Confirm password is required',
      })
      .min(12, { message: 'Confirm password must be at least 12 characters' })
      .regex(/[A-Z]/, { message: 'Confirm password must have an uppercase letter' })
      .regex(/[a-z]/, { message: 'Confirm password must have a lowercase letter' })
      .regex(/[0-9]/, { message: 'Confirm password must have a number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Confirm password must have a special character' }),
    }),

  patientData: z.object({
    patientFullName: z.string({
      invalid_type_error: "Full name must be a string",
      required_error: "Full name is required",
    }).min(3, { message: "Full name must be at least 3 characters" }),
    patientDateOfBirth: z.date({
      invalid_type_error: "Date of birth is required",
      required_error: "Date of birth is required",
    }),
    patientGender: z.string({
      invalid_type_error: "Gender must be a string",
      required_error: "Gender is required",
    }).min(4, { message: "Gender is required" }),
    patientAddress: z.string({
      invalid_type_error: "Address must be a string",
      required_error: "Address is required",
    }).min(10, { message: "Address must be at least 10 characters" }),
  }),

});


