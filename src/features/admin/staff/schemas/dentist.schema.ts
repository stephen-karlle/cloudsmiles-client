import { z } from 'zod';
import { ScheduleSchema } from './schedule.schema';


export const NewDentistSchema = z.object({

  dentistAvatar: z.instanceof(File).nullable(),

  dentistEmploymentType: z.string({
    invalid_type_error: "Employment must be a string",
  }).min(1, {message: "Employment is required"}),

  dentistFullName: z.string({
    invalid_type_error: "Full name must be a string",
  }).min(1, {message: "Full name is required"}),

  dentistSpecialization: z.string({
    invalid_type_error: "Specialization must be a string",
  }).min(1, {message: "Specialization is required"}),

  dentistPhoneNumber: z.string({
    invalid_type_error: "Phone number must be a string",
  }).min(11, {message: "Phone number is required"}),

  dentistGender: z.string({
    invalid_type_error: "Gender must be a string",
  }).min(4, {message: "Gender is required" }),

  dentistDateOfBirth: z.string({
    invalid_type_error: "Date of birth must be a string",
    required_error: "Date of birth is required",
  }),

  dentistEmail: z.string({
    invalid_type_error: "Email must be a string",
  }).min(1, {message: "Email is required"}).email(),

  dentistAddress: z.string({
    invalid_type_error: "Address must be a string",
  }).min(1, {message: "Address is required"}),

  dentistMedicalServices: z.array(
    z.string({
      invalid_type_error: "Address must be a string",
    })
  ).min(1, {message: "Tooth services is required"}),

  dentistCosmeticServices: z.array(
    z.string({
      invalid_type_error: "Address must be a string",
    })
  ).min(1, {message: "Tooth services is required"}),


  dentistSchedule: z.array(ScheduleSchema)
  .min(1, { message: "At least one schedule is required" }),


});

export const EditDentistSchema = z.object({
  dentistId: z.string({}).optional(),
  dentistAvatar: z.any().nullable(),
  
  dentistEmploymentType: z.string({
    invalid_type_error: "Employment must be a string",
  }).min(1, {message: "Employment is required"}),
    
  dentistGender: z.string({
    invalid_type_error: "Gender must be a string",
  }).min(4, {message: "Gender is required" }),

  dentistDateOfBirth: z.string({
    invalid_type_error: "Date of birth must be a date",
    required_error: "Date of birth is required",
  }),

  dentistFullName: z.string({
    invalid_type_error: "Full name must be a string",
  }).min(1, {message: "Full name is required"}),

  dentistSpecialization: z.string({
    invalid_type_error: "Specialization must be a string",
  }).min(1, {message: "Specialization is required"}),

  dentistPhoneNumber: z.string({
    invalid_type_error: "Phone number must be a string",
  }).min(11, {message: "Phone number is required"}),

  dentistEmail: z.string({
    invalid_type_error: "Email must be a string",
  }).min(1, {message: "Email is required"}).email(),

  dentistAddress: z.string({
    invalid_type_error: "Address must be a string",
  }).min(1, {message: "Address is required"}),

  dentistMedicalServices: z.array(
    z.string({
      invalid_type_error: "Address must be a string",
    })
  ).min(1, {message: "Tooth services is required"}),

  dentistCosmeticServices: z.array(
    z.string({
      invalid_type_error: "Address must be a string",
    })
  ).min(1, {message: "Tooth services is required"}),


  dentistSchedule: z.array(ScheduleSchema).min(1, { message: "At least one schedule is required" }),
});