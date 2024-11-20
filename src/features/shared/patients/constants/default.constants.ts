import { PatientProfileResponseType } from "../types/patient.types";

export const dentalRecordDataDefaultValues = {
  recordPatientId: "",
  recordBloodPressure:{
    mm: 0,
    hg: 0
  },
  recordAllergies: [],
  recordSickness: [],
  recordOralData: {
    "occlusi":"",
    "anomalousTeeth": "",
    "torusPalatinus": "",
    "torusMandibularis": "",
    "palatum": "",
    "other": ""
  },
  recordHygieneData: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  },
  updatedAt: ""
}

export const patientProfileDefaultValues: PatientProfileResponseType = {
  recordData: dentalRecordDataDefaultValues,
  patientData: {
    _id: "",
    patientAvatar: "",
    patientFullName: "",
    patientDateOfBirth: "",
    patientGender: "",
    patientSerialId: "",
    patientAddress: "",
    patientStatus: "Pending",
    patientCredentialId: {
      credentialEmail: "",
      credentialPhoneNumber: ""
    },
    createdAt: ""
  },
  checkupData: [],
  appointmentData: []
}