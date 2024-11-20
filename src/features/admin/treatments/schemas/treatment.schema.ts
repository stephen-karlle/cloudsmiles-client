import { z } from 'zod';


const treatmentMedicinesSchema = z.array(
  z.object({
    _id: z.string().optional(),
    medicineProductId: z.string({
      invalid_type_error: "Medicine id must be a string",
    }).min(1, { message: "Medicine id is required" }),
    medicineName: z.string({
      invalid_type_error: "Medicine name must be a string",
    }).min(1, { message: "Medicine name is required" }),
    medicineAmount: z.preprocess((val) => parseFloat(val as string), z.number(
      { invalid_type_error: "Amount is required" }
    ).min(0, { message: "Amount is required" }
    )).refine((data) => data > 0, {
      message: "Amount is required",
    }),
    medicineFreeAmount: z.preprocess((val) => {
      if (val === "") {
        return undefined;
      }
      return parseFloat(val as string);
    }, z.number({
      invalid_type_error: "Availability is required",
    }).optional())
    .refine((data) => {
      if (data !== undefined) {
        return data > 0;
      }
      return true;
    }, {
      message: "Availability is required",
      path: ["medicineFreeAmount"],
    }),
    isMedicineFree: z.string({
      invalid_type_error: "Is free must be a string",
    }).min(1, { message: "Availability is required" }),

    prescriptionDosageAmount: z.preprocess((val) => parseFloat(val as string), z.number(
      { invalid_type_error: "Dosage amount is required" }
    ).min(0, { message: "Dosage amount is required" }
    )).refine((data) => data > 0, {
      message: "Dosage amount is required",
    }),
    prescriptionDosageType: z.string({
      invalid_type_error: "Dosage type must be a string",
    }).min(1, { message: "Dosage type is required" }),
    prescriptionTimeDuration: z.preprocess((val) => parseFloat(val as string), z.number(
      { invalid_type_error: "Time duration is required" }
    ).min(0, { message: "Time duration is required" }
    )).refine((data) => data > 0, {
      message: "Time duration is required",
    }),
    prescriptionTimeUnit: z.string({
      invalid_type_error: "Time unit must be a string",
    }).min(1, { message: "Time unit is required" }),
    prescriptionTimeOfTheDay: z.array(
      z.string({
        invalid_type_error: "Time of the day must be a string",
      }).min(1, { message: "Time of the day is required" })
    ).min(1, { message: "Time of the day is required" }),
    prescriptionRepeatition: z.string({
      invalid_type_error: "Repeatition must be a string",
    }).min(1, { message: "Repeatition is required" }),
    prescriptionIntakeSchedule: z.array(
      z.string({
        invalid_type_error: "Intake schedule must be a string",
      }).min(1, { message: "Intake schedule is required" })
    ).min(1, { message: "Intake schedule is required" }),
  }).refine((data) => {
        if (data.isMedicineFree === "freeUpTo") {
          return data.medicineFreeAmount !== undefined;
        }
        return true;
      }, {
        message: "Availability is required",
        path: ["medicineFreeAmount"], 
      }
    )
  )
.optional()


const treatmentComponentsSchema = z.array(
  z.object({
    _id: z.string().optional(),
    componentProductId: z.string({
      invalid_type_error: "Component id must be a string",
    }).min(1, { message: "Component id is required" }),
    componentName: z.string({
      invalid_type_error: "Component must be a string",
    }).min(1, { message: "Component is required" }),
    componentAmount: z.preprocess((val) => parseFloat(val as string), z.number(
      { invalid_type_error: "Amount is required" }
    ).min(0, { message: "Amount is required" }
    )).refine((data) => data > 0, {
      message: "Amount is required",
    }),
    isComponentFree: z.string({
      invalid_type_error: "Availability must be a string",
    }).min(1, { message: "Availability is required" }),
    componentFreeAmount: z.preprocess((val) => {
      if (val === "") {
        return undefined;
      }
      return parseFloat(val as string);
    }, z.number({
      invalid_type_error: "Availability is required",
    }).optional())
    .refine((data) => {
      if (data !== undefined) {
        return data > 0;
      }
      return true;
    }, {
      message: "Availability is required",
      path: ["componentFreeAmount"],
    }),
  }).refine((data) => {
        if (data.isComponentFree === "freeUpTo") {
          return data.componentFreeAmount !== undefined;
        }
        return true;
      }, {
        message: "Availability is required",
        path: ["componentFreeAmount"], 
      }
    )
  )
.optional()

export const NewTreatmentSchema = z.object({

  treatmentName: z.string({
    invalid_type_error: "Treatment name must be a string",
  }).min(1, {message: "Treatment name is required"}),

  treatmentCategory: z.string({
    invalid_type_error: "Treatment category must be a string",
  }).min(1, {message: "Treatment category is required"}),

  treatmentDescription: z.string({
    invalid_type_error: "Treatment description must be a string",
  }).min(1, {message: "Treatment description is required"}),

  treatmentChargeType: z.string({
    invalid_type_error: "Treatment charge type must be a string",
  }).min(1, {message: "Treatment charge type is required"}),

  treatmentCost: z.preprocess((val) => parseFloat(val as string), z.number(
    { invalid_type_error: "Treatment cost is required"}
  ).min(0, { message: "Treatment cost is required" })),
  
  treatmentDuration: z.preprocess((val) => parseFloat(val as string), z.number(
    { invalid_type_error: "Treatment duration is required"}
  ).min(0, { message: "Treatment duration is required" })),
  

  treatmentComponents: treatmentComponentsSchema,
  treatmentMedicines: treatmentMedicinesSchema,

});

export const EditTreatmentSchema = NewTreatmentSchema.extend({
  _id: z.string().min(1, { message: "Treatment id is required" }),
});