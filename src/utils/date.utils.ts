import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';


export const convertISOStringToShortDate = (isoString: string): string => {
  if (!isoString) {
    return '';
  }
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
  }

export const convertISOStringToTime = (isoString: string): string => {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const convertISOStringToFullDate = (isoString: string | null): string => {
  if (!isoString) {
    return '';
  }
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

export const isNew = ( date: string ) => {
  const currentDate = new Date();
  const createdAtDate = new Date(date);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return timeDifference <= oneDayInMilliseconds;
};

export const isToday = (date: string | Date) => {
  const currentDate = new Date();
  const createdAtDate = new Date(date);
  return currentDate.toDateString() === createdAtDate.toDateString();
}

export const generateWeekDays = (date: Date): { start: Date, end: Date } => {
  const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(date);
  const daysToMonday = (dayOfWeek + 6) % 7; // Calculate days to Monday
  startOfWeek.setDate(date.getDate() - daysToMonday); // Set to Monday
  startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday
  endOfWeek.setHours(23, 59, 59, 999); // Set time to 00:00:00

  return {
    start: startOfWeek,
    end: endOfWeek
  };
};


export const convertUTCDateToLocalDate = (date: string): string => {
  const timeZone = 'Asia/Taipei'; 
  const utcDate = new Date(date);
  const zonedDate = toZonedTime(utcDate, timeZone)
  const string = zonedDate.toISOString();
  return string
};

export const convertDateToISOString = (date: Date): string => {
  const timeZone = 'Asia/Manila';
  
  // Convert the date to Taiwan time
  const zonedDate = toZonedTime(date, timeZone);
  const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss");

  return formattedDate;
};