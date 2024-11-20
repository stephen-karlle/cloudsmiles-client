import { z } from "zod";
import { ScheduleSchema } from "./schedule.schema";


export const NewAssistantSchema = z.object({

  assistantAvatar: z.instanceof(File).nullable(),

  assistantEmploymentType: z.string({
    invalid_type_error: "Employment must be a string",
  }).min(1, {message: "Employment is required"}),

  assistantRole: z.string({
    invalid_type_error: "Role must be a string",
  }).min(1, {message: "Role is required"}),

  assistantFullName: z.string({
    invalid_type_error: "Full name must be a string",
  }).min(1, {message: "Full name is required"}),

  assistantDateOfBirth: z.string({
    invalid_type_error: "Date of birth must be a string",
    required_error: "Date of birth is required",
  }),

  assistantGender: z.string({
    invalid_type_error: "Gender must be a string",
    required_error: "Gender is required",
  }).min(4, {message: "Gender is required" }),

  assistantPhoneNumber: z.string({
    invalid_type_error: "Phone number must be a string",
  }).min(11, {message: "Phone number is required"}),

  assistantEmail: z.string({
    invalid_type_error: "Email must be a string",
  }).min(1, {message: "Email is required"}).email(),

  assistantAddress: z.string({
    invalid_type_error: "Address must be a string",
  }).min(1, {message: "Address is required"}),

  assistantSchedule: z.array(ScheduleSchema)
  .min(1, { message: "At least one schedule is required" }),


});

export const EditAssistantSchema = z.object({
  assistantId: z.string({}).optional(),
  assistantAvatar: z.any().nullable(),
  
  assistantDateOfBirth: z.string({
    invalid_type_error: "Date of birth must be a string",
    required_error: "Date of birth is required",
  }),

  assistantGender: z.string({}).min(1, {
    message: "Gender is required",
  }),

  assistantEmploymentType: z.string({
    invalid_type_error: "Employment must be a string",
  }).min(1, {message: "Employment is required"}),

  assistantRole: z.string({
    invalid_type_error: "Role must be a string",
  }).min(1, {message: "Role is required"}),

  assistantFullName: z.string({
    invalid_type_error: "Full name must be a string",
  }).min(1, {message: "Full name is required"}),

  assistantPhoneNumber: z.string({
    invalid_type_error: "Phone number must be a string",
  }).min(11, {message: "Phone number is required"}),

  assistantEmail: z.string({
    invalid_type_error: "Email must be a string",
  }).min(1, {message: "Email is required"}).email(),

  assistantAddress: z.string({
    invalid_type_error: "Address must be a string",
  }).min(1, {message: "Address is required"}),


  assistantSchedule: z.array(ScheduleSchema).min(1, { message: "At least one schedule is required" }),
});