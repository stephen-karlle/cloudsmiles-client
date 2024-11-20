
export const getPaymentStatus = (status: string) => {
  switch (status) {
    case 'paid':
      return 'FULLY PAID'
    case 'partial':
      return 'PARTIALLY PAID'
    case 'notPaid':
      return 'NOT PAID'
    default:
      return 'NOT PAID'
  }
}

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-50 text-green-500'
    case 'partial':
      return 'bg-violet-50 text-violet-500'
    case 'notPaid':
      return 'bg-rose-50 text-rose-500'
    default:
      return 'bg-gray-100 text-gray'
  }
}