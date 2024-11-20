


export type AgreementResponseType = {
  documentName: string;
  documentUrl: string;
}


export type BillResponseType = { 
  billAppointmentId: string
  billStatus: "pending" | "cancelled" | "success" | "failed";
  billMethod: string;
  billAmount: number;
  billNotes: string;
  billTotalCost: number;
  billIntentId: string;
  billRedirectUrl: string;
  billDueDate: Date;
  billType: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewType = {
  reviewAppointmentId: string;
  reviewRating: number;
  reviewComment: string;
}