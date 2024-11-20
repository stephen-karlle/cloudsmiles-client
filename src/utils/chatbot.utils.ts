


export const formatDate =(isoDateString: string) => {
  const date = new Date(isoDateString);

  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];

  let suffix = 'th';
  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }

  return `${month}, ${day}${suffix} ${year}`;
}

