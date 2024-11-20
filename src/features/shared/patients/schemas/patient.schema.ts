import z from "zod";

export const NewPatientSchema = z.object({

  patientAvatar: z.any().optional(),

  patientFullName: z.string({
    invalid_type_error: "Full name must be a string",
  }).min(1, {message: "Full name is required"}),

  patientPhoneNumber: z.string({
    invalid_type_error: "Phone number must be a string",
  }).min(1, {message: "Phone number is required"}),

  patientEmail: z.string({
    invalid_type_error: "Email must be a string",
  }).min(1, {message: "Email is required"}),

  patientAddress: z.string({
    invalid_type_error: "Address must be a string",
  }).min(1, {message: "Address is required"}),

  patientDateOfBirth: z.date({
    invalid_type_error: "Date of birth is required",
    required_error: "Date of birth is required",
  }),
  patientGender: z.string({
    invalid_type_error: "Gender must be a string",
  }).min(1, {message: "Gender is required"}),

});

export const CurrentPatientSchema = NewPatientSchema.extend({
  patientId: z.string({
    invalid_type_error: "Patient Id must be a string",
  }).min(1, {message: "Patient Id is required"}),
})
