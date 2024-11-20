



export const getStatusAndColor = (quantity: number) => {
  if (quantity > 15) {
    return { status: 'In Stock', color: '#22c55e' };
  } else if (quantity === 0) {
    return { status: 'Out of Stock', color: '#f43f5e' };
  } else if (quantity > 0 && quantity <= 15) {
    return { status: 'Low stock', color: '#f59e0b' };
  } else {
    return { status: '', color: '' };
  }
};
