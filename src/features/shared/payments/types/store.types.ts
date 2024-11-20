import { IActiveSheet, ISheet } from "@components/ui/Drawer";
import { PaymentResponseType } from "./payment.types";


export type PaymentStoreType = {

  selectedPayment: PaymentResponseType;
  setSelectedPayment: (payment: PaymentResponseType) => void

  drawerStates: Record<string, boolean>;
  toggleDrawer: (paymentSerialId: string) => void;
  closeDrawer: () => void;

  cardStates: Record<string, boolean>;
  toggleCard: (paymentMethod: string) => void;
  closeCards: () => void;

  modalStates: Record<string, boolean>;
  toggleModal: (paymentSerialId: string) => void;
  closeModal: () => void;

  paymentActiveSheets: IActiveSheet[];
  setPaymentActiveSheets: (updater: (sheets: IActiveSheet[]) => IActiveSheet[]) => void;

  paymentMainSheet: ISheet;
  setPaymentMainSheet: (viewMainSheet: ISheet) => void;

  paymentSteps: Record<string, number>;
  setPaymentStep: (method: string, step: number) => void;
  clearPaymentSteps: () => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

    
}