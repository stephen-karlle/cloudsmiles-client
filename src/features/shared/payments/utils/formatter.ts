

export const formatPaymentMethod = (paymentMethod: string): string => {
  switch (paymentMethod) {
    case "gcash":
      return "GCash";
    case "paymaya":
      return "PayMaya";
    case "billease":
      return "BillEase";
    case "grab_pay":
      return "GrabPay";
    default:
      return paymentMethod;
  }
}