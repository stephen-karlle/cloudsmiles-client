import { dentalRecordDataDefaultValues } from "@features/shared/patients/constants/default.constants"


export const dentistDefaultValues = {
  _id: "",
  dentistAvatar: "",
  dentistGender: "",
  dentistDateOfBirth: new Date(),
  dentistEmploymentType: "",
  dentistFullName: "",
  dentistSpecialization: "",
  dentistAddress: "",
  dentistSchedule: [],
  dentistCosmeticServices: [],
  dentistMedicalServices: [],
  unAvailableDates: [],
  dentistCredentialId: {
    _id: "",
    credentialEmail: "",
    credentialPhoneNumber: "",
  },
  dentistScheduleId: {
    schedules: [],
  },
  startTime: "",
  endTime: "",
  createdAt: "",
  updatedAt: "",
}

export const selectedAppointmentDefaultValues = {
  appointmentData: {
    _id: "",
    appointmentSerialId: "",
    appointmentReasonForVisit: "",
    appointmentDate: { start: "", end: "" },
    appointmentStatus: "",
    appointmentDentistId: dentistDefaultValues,
  },
  dentistData: dentistDefaultValues,
  patientData: {
    _id: "",
    patientSerialId: "",
    patientFullName: "",
    patientDateOfBirth: "",
    patientGender: "",
    patientAddress: "",
    patientStatus: "",
    patientAvatar: "",
  },
  paymentData: {
    paymentSerialId: "",
    paymentStatus: "",
    paymentMethod: "",
    paymentAmount: 0,
    paymentDate: "",
    paymentType: "",
    paymentNotes: "",
    paymentTotalCost: 0,
    paymentDueDate: new Date(),
  },
  credentialData: {
    credentialEmail: "",
    credentialPhoneNumber: "",
  },
  recordData: dentalRecordDataDefaultValues
}

export const paymentStepsDefaultValues = {
  GCash: 1,
  PayMaya: 1,
  BillEase: 1,
  Card: 1,
  Bank: 1,
  GrabPay: 1,
} 

