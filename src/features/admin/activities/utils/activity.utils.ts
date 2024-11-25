


export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}


export const getActionClasses = (action: string) => {

  switch (action) {
    case 'Update':
      return 'text-purple-500 bg-purple-50';
    case 'Create':
      return 'text-emerald-500 bg-emerald-50';
    case 'Delete':
      return 'text-red-500 bg-red-50';
    case 'Read':
      return 'text-sky-500 bg-sky-50';
    default:
      return 'text-gray-500';
  }
}
