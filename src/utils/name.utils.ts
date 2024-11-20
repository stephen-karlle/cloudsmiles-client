
export const getInitials = (fullName: string): string => {
  const nameParts = fullName.trim().split(/\s+/); // Split by any whitespace and remove extra spaces
  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';
  return firstNameInitial + lastNameInitial;
};

export const getColorForInitial = (initial: string) => {
  const letterToColor: { [key: string]: string } = {
    A: 'bg-teal-500',
    B: 'bg-yellow-500',
    C: 'bg-red-500',
    D: 'bg-green-500',
    E: 'bg-blue-500',
    F: 'bg-indigo-500',
    G: 'bg-orange-500',
    H: 'bg-pink-500',
    I: 'bg-purple-500',
    J: 'bg-blue-500',
    K: 'bg-red-500',
    L: 'bg-teal-500',
    M: 'bg-green-500',
    N: 'bg-yellow-500',
    O: 'bg-indigo-500',
    P: 'bg-purple-500',
    Q: 'bg-pink-500',
    R: 'bg-orange-500',
    S: 'bg-red-500',
    T: 'bg-green-500',
    U: 'bg-blue-500',
    V: 'bg-yellow-500',
    W: 'bg-purple-500',
    X: 'bg-pink-500',
    Y: 'bg-indigo-500',
    Z: 'bg-teal-500',
    1: 'bg-red-500',
    2: 'bg-green-500',
    3: 'bg-blue-500',
    4: 'bg-yellow-500',
    5: 'bg-purple-500',
    6: 'bg-pink-500',
    7: 'bg-orange-500',
    8: 'bg-red-500',
    9: 'bg-teal-500',
    0: 'bg-indigo-500',
  };
  return letterToColor[initial.charAt(0).toUpperCase()]
};


export const getPatientBadgeStyle = (status: string) => {
  switch (status) {
    case 'Verified':
      return 'bg-green-50 text-green-500';
    case 'Pending':
      return 'bg-amber-50 text-amber-500';
    default:
      return 'bg-gray-50 text-white';
  }
}
