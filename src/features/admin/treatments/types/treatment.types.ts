
export type TreatmentRequestType = {
  _id?: string;
  treatmentName:string
  treatmentCategory: string;
  treatmentDescription: string;
  treatmentCost: number;
  treatmentDuration: string;
  treatmentChargeType: string;
  treatmentSerialId: string;
  treatmentRepetition: string;
  treatmentComponents: ITreatmentComponent[];
  treatmentMedicines:TreatmentMedicineType[];
  // treatmentVisits: ITreatmentVisit[];
}

// export interface ITreatmentVisit {
//   treatmentId?:string
//   treatmentName:string
//   treatmentDescription: string;
//   treatmentDuration: string;
//   treatmentComponents: ITreatmentComponent[];
//   timeInterval: ITimeInterval
// }

export interface ITimeInterval{
  value: string;
  timeUnit: string;
}

export interface ComponentListType {
  id: string;
  name: string;
}

export interface MedicineListType {
  id: string;
  name: string;
}

export interface ITreatmentComponent{
  _id: string;
  productId: string;
  componentName: string;
  componentAmount: string;
  isFree: "free" | "freeUpTo" | "";
  freeAmount?: string;
}

export type TreatmentMedicineType = {
  _id: string;
  productId: string;
  componentName: string;
  componentAmount: string;
  isFree: "free" | "freeUpTo" | "";
  freeAmount?: string;
  dosage: string;
}


export interface ITreatmentComponentCard{
  componentsOptionList: ComponentListType[]
  index: number;
}

export type TreatmentMedicineCardType = {
  medicinesOptionList: MedicineListType[]
  index: number;
}

export interface ITreatmentVisitationCard { 
  index: number;
}


export interface ITreatmentDataResponse {
  _id: string;
  treatmentSerialId: string;
  treatmentName: string;
  treatmentCategory: string;
  treatmentType: "single" | "multiple";
  treatmentChargeType: string;
  treatmentDescription: string;
  treatmentCost: number;
  treatmentDuration: string;
  treatmentComponents: TreatmentComponentResponseType[];
  treatmentMedicines: TreatmentMedicineResponseType[];
  createdAt: Date;
  updatedAt: Date;
}

type TreatmentCostsType = ITreatmentDataResponse & {
  sections?:[]
  tooths?:[]
}

export type TreatmentCostsResponseType = {
  tooth?: TreatmentCostsType[]
  section?: TreatmentCostsType[]
  general?: TreatmentCostsType[]
}

export type TreatmentComponentResponseType = {
  componentId: ITreatmentComponent
}

export type TreatmentMedicineResponseType = {
  medicineId: TreatmentMedicineType
}
