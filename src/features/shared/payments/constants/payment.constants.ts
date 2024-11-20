
import GCashLogo from '@assets/payments/GCashLogo.svg'
import PayMayaLogo from '@assets/payments/PayMayaLogo.svg'
import BillEaseLogo from '@assets/payments/BillEaseLogo.svg'
import GrabPayLogo from '@assets/payments/GrabPayLogo.svg'

export const paymentMethodMap: Record<string, string> = {
  "GCash": "gcash",
  "PayMaya": "paymaya",
  "BillEase": "billease",
  "Card": "card",
  "Bank": "dob",
  "GrabPay": "grab_pay",
};


export const getSelectedPaymentMethod = (states: Record<string, boolean>): string => {
  for (const [method, isSelected] of Object.entries(states)) {
    if (isSelected) {
      return paymentMethodMap[method as keyof typeof paymentMethodMap] || 'gcash';
    }
  }
  return 'gcash';
};

export const paymentLogoMap: Record<string, string> = {
  "GCash": GCashLogo,
  "PayMaya": PayMayaLogo,
  "BillEase": BillEaseLogo,
  "GrabPay": GrabPayLogo,
}