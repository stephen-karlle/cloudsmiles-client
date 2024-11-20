import { z } from 'zod';



export const NewAppointmentSchema = z.object({

  appointmentData: z.object({
    appointmentReasonForVisit: z.string({
      invalid_type_error: "Reason for visit must be a string",
      required_error: "Reason for visit is required",
    }).min(1, { message: "Reason for visit is required" }),
    appointmentDate: z.string({
      invalid_type_error: "Appointment date is required",
      required_error: "Appointment date is required",
    }).min(1, { message: "Appointment date is required"}),
    appointmentTime: z.object({
      start: z.string({
        invalid_type_error: "Appointment time is required",
        required_error: "Appointment time is required",
      }).min(1, { message: "Appointment time is required" }),
      end: z.string({
        invalid_type_error: "Appointment time is required",
        required_error: "Appointment time is required",
      }).min(1, { message: "Appointment time is required" }),
    }),
  }),

  dentistData: z.object({
    _id: z.string({
      invalid_type_error: "Dentist ID must be a string",
      required_error: "Dentist ID is required",
    }),
  }),

  patientData: z.object({
    patientId: z.string({
      required_error: "Patient is required",
      invalid_type_error: "Patient must be a string",
    }).min(1, {message: "Patient is required"}),
  }),

});


export const ViewAppointmentSchema = z.object({
  checkupAppointmentId: z.string({}).min(1, {message: "Appointment ID is required"}),
  checkupPatientId: z.string({}).min(1, {message: "Patient ID is required"}),
  checkupData: z.object({
    toothCheckup: z.array(
      z.object({
        toothNumber: z.number().min(1, {message: "Tooth is required"}),
        toothTreatmentPlans: z.array(
          z.object({
            _id: z.string().optional(),
            toothCondition: z.string().min(1, {message: "Condition is required"}),
            toothStatus: z.string().min(1, {message: "Status is required"}),
            toothTreatmentId: z.string().min(1, {message: "Treatment is required"}),
          })
        )
      }
    )).optional(),
    sectionCheckup: z.array(
      z.object({
        sectionName: z.string().min(1, {message: "Section is required"}),
        sectionTreatmentPlans: z.array(
          z.object({
            _id: z.string().optional(),
            sectionCondition: z.string().min(1, {message: "Condition is required"}),
            sectionStatus: z.string().min(1, {message: "Status is required"}),
            sectionTreatmentId: z.string().min(1, {message: "Treatment is required"}),
          })
        )
      }
    )).optional(),
    generalCheckup: z.array(
      z.object({
        _id: z.string().optional(),
        generalTreatmentId: z.string().min(1, {message: "Treatment is required"}),
        generalStatus: z.string().min(1, {message: "Status is required"}),
        generalNotes: z.string().optional(),
      }
    )).optional(),
  }).refine(data => {
    return (
      (data.toothCheckup && data.toothCheckup.length > 0) ||
      (data.sectionCheckup && data.sectionCheckup.length > 0) ||
      (data.generalCheckup && data.generalCheckup.length > 0)
    );
  }, {
    message: "At least one checkup is required",
    path: ["checkupData"]
  }),
  agreementDocuments: z.array(
    z.object({
      file: z.instanceof(File).optional(),
      _id: z.string().optional(),
    })  
  ).optional(),
})


export const PayAppointmentSchema = z .object({
  appointmentId: z.string().min(1, { message: "Appointment ID is required" }),
  paymentAmount: z.number({
    invalid_type_error: "Payment amount must be a number",
    required_error: "Payment amount is required",
  }),
  paymentTotalCost: z
    .number({
      invalid_type_error: "Payment amount must be a number",
      required_error: "Payment amount is required",
    })
    .min(1, { message: "Total cost is required" }),
  paymentMethod: z
    .string({
      invalid_type_error: "Payment method must be a string",
      required_error: "Payment method is required",
    })
    .min(1, { message: "Payment method is required" }),
  paymentStatus: z.string().optional(),
  paymentType: z
    .string({
      invalid_type_error: "Payment type must be a string",
      required_error: "Payment type is required",
    })
    .min(1, { message: "Payment type is required" }),
  paymentDueDate: z
    .string({
      invalid_type_error: "Due date is required",
      required_error: "Due date is required",
    })
    .optional(),
  paymentNotes: z
    .string({
      invalid_type_error: "Payment notes must be a string",
    })
    .optional(),
})
.refine(
  (data) =>
    data.paymentType !== "Full" || data.paymentAmount >= data.paymentTotalCost,
  {
    message: "For full payment, amount must be equal to total cost",
    path: ["paymentAmount"],
  }
)
.refine(
  (data) => data.paymentType !== "Installment" || data.paymentAmount > 100,
  {
    message: "For installment, 100 is the minimum required amount",
    path: ["paymentAmount"],
  }
)
.refine(
  (data) => data.paymentType !== "Installment" || !!data.paymentDueDate,
  {
    message: "For installment, due date is required",
    path: ["paymentDueDate"],
  }
);


export const DentalRecordSchema = z.object({
  recordPatientId: z.string().min(1, { message: "Patient ID is required" }),
  recordBloodPressure: z.object({
    mm: z.number().optional(),
    hg: z.number().optional(),
  }).optional(),
  recordSickness: z.array(z.string()).optional(),
  recordAllergies: z.array(z.string()).optional(),
  recordOralData: z.object({
    occlusi: z.string().optional(),
    torusPalatinus: z.string().optional(),
    torusMandibularis: z.string().optional(),
    palatum: z.string().optional(),
    anomalousTeeth: z.string().optional(),
    other: z.string().optional(),
  }).optional(),
  recordHygieneData: z.object({
    1: z.string().optional(),
    2: z.string().optional(),
    3: z.string().optional(),
    4: z.string().optional(),
    5: z.string().optional(),
    6: z.string().optional(),
    7: z.string().optional(),
  }).optional(),
});
