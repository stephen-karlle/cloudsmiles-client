

export const generateWeekTimeSlots = (start: Date, end: Date, id: string,) => {
  let result = [];
  let current = new Date(start);
  current.setMinutes(current.getMinutes()); 

  while (current < new Date(end)) {
    let time = current.toTimeString().split(' ')[0].substring(0, 5); 
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const day = current.toLocaleDateString('en-US', options);

    result.push({ time: time + "-" + day  , id: id }); 
    current.setMinutes(current.getMinutes() + 15); // add 15 minutes
  }
  return result;
};


export const generateTimeSlots = (start: Date, end: Date, id: string) => {
  let result = [];
  let current = new Date(start);
  current.setMinutes(current.getMinutes()); 

  while (current < new Date(end)) {
    let time = current.toTimeString().split(' ')[0].substring(0, 5); 

    result.push({ time: time   , id: id }); 
    current.setMinutes(current.getMinutes() + 15); // add 15 minutes
  }
  return result;
};

  
export const generateDates = (currentDate: Date | string | null) => {
  const date = currentDate ? new Date(currentDate) : new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Find the Monday that starts the week of the first day of the month
  const startDay = firstDayOfMonth.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
  const adjustment = startDay === 0 ? -6 : 1 - startDay; // Adjust to get the previous Monday
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() + adjustment);

  // Find the Sunday that ends the week of the last day of the month
  const endDay = lastDayOfMonth.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
  const endAdjustment = endDay === 0 ? 0 : 7 - endDay; // Adjust to get the next Sunday
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + endAdjustment);

  // Generate dates
  const dates = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    d.setHours(0, 0, 0, 0); // Set time to 00:00:00
    dates.push(new Date(d));
  }

  // Split dates into weeks
  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return weeks.flat();
};



export const generateWeekDates = (currentDate: Date): Date[] => {
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay(); // Get the day of the week (0 - Sunday, 6 - Saturday)
  
  // Adjust to start from Monday
  const diff = day === 0 ? -6 : 1 - day; // If Sunday (0), move back 6 days; otherwise, calculate from Monday
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  
  const weekDates: Date[] = [];
  
  // Populate the array with dates from Monday to Sunday
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
};
