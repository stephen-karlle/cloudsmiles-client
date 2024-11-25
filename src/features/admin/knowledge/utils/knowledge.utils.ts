

export const getCategoryStyle = (category: string) => {
  const firstLetter = category.charAt(0).toUpperCase();
  switch (firstLetter) {
    case 'A':
      return 'bg-blue-50 text-blue-500';
    case 'B':
      return 'bg-green-50 text-green-500';
    case 'C':
      return 'bg-yellow-50 text-yellow-500';
    case 'D':
      return 'bg-red-50 text-red-500';
    case 'E':
      return 'bg-purple-50 text-purple-500';
    case 'F':
      return 'bg-indigo-50 text-indigo-500';
    case 'G':
      return 'bg-pink-50 text-pink-500';
    case 'H':
      return 'bg-gray-50 text-gray-500';
    case 'I':
      return 'bg-blue-50 text-blue-500';
    case 'J':
      return 'bg-green-50 text-green-500';
    case 'K':
      return 'bg-yellow-50 text-yellow-500';
    case 'L':
      return 'bg-red-50 text-red-500';
    case 'M':
      return 'bg-purple-50 text-purple-500';
    case 'N':
      return 'bg-indigo-50 text-indigo-500';
    case 'O':
      return 'bg-pink-50 text-pink-500';
    case 'P':
      return 'bg-gray-50 text-gray-500';
    case 'Q':
      return 'bg-blue-50 text-blue-500';
    case 'R':
      return 'bg-green-50 text-green-500';
    case 'S':
      return 'bg-yellow-50 text-yellow-500';
    case 'T':
      return 'bg-red-50 text-red-500';
    case 'U':
      return 'bg-purple-50 text-purple-500';
    case 'V':
      return 'bg-indigo-50 text-indigo-500';
    case 'W':
      return 'bg-pink-50 text-pink-500';
    case 'X':
      return 'bg-gray-50 text-gray-500';
    case 'Y':
      return 'bg-blue-50 text-blue-500';
    case 'Z':
      return 'bg-green-50 text-green-500';
    default:
      return 'bg-gray-50 text-gray-500';
  }
}
