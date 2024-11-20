import { ISchedule } from "@features/admin/staff/types/schedule.types";
import { IDentistData } from "../types/appointment.types"
import { IAppointmentResponse } from "../types/appointment.types"
import { ITimeSlot } from "../types/store.types";
// A function that generates an array of dates for the current however it doesnt include the days that the dentist doesnt work
export const generateDentistWeeklySchedule = (date: Date, dentistSchedule: ISchedule[] | undefined): Date[] => {
  if (!dentistSchedule) {
    return [];
  }

  const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startOfWeek = new Date(date); // Clone the given date

  // Calculate the date for the Monday of the current week
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  startOfWeek.setDate(date.getDate() + diffToMonday);

  // Generate an array of dates from Monday to Sunday
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);
    return weekDate;
  });

  // Filter dates that are inside the dentistSchedule
  const filteredDates = weekDates.filter(weekDate => {
    const weekDayName = weekDate.toLocaleDateString('en-US', { weekday: 'long' });
    return dentistSchedule.some(schedule => schedule.day === weekDayName);
  });


  return filteredDates;
};
export const generateDateForDay = (day: string, date: Date): Date => {
  const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const startOfWeek = new Date(date);
  const dayOfWeek = startOfWeek.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7; // Calculate difference to Monday
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight

  const targetDayIndex = daysOfWeekOrder.indexOf(day);
  if (targetDayIndex === -1) {
      throw new Error("Invalid day provided");
  }

  const targetDate = new Date(startOfWeek);
  targetDate.setDate(startOfWeek.getDate() + targetDayIndex);

  return targetDate;
};
export const generateDayGridCol = (dentists: IDentistData[] | undefined, gridColWidth: number) => {
  if (!dentists) {
    return "96px";
  }
  return "96px " + Array(dentists.length).fill(`${gridColWidth}px`).join(" ");
}
export const generateWeekGridCol = (dentists: IDentistData[] | undefined, gridColWidth: number,) => {
  if (!dentists) {
    return "96px";
  }
  return "96px " + dentists.map((dentist) => `${gridColWidth * (dentist?.dentistSchedule?.length ?? 7)}px`).join(" ");
}

export const generateMonthGridCol = (dentists: IDentistData[] | undefined, gridColWidth: number,) => {
  if (!dentists) {
    return "0px";
  }
  return dentists.map((dentist) => `${gridColWidth * (dentist?.dentistSchedule?.length ?? 7)}px`).join(" ");
}
export const addDateOffset = (date: Date): string => {
  // Extract date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  // Format to "YYYY-MM-DDTHH:mm:ss.SSS"
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}
export const removeDateOffset = (stringDate: string): Date => {
  const date = new Date(stringDate);
  date.setHours(date.getHours() - 8);
  return date;
}
export const formatTimeToString = (time: number) => {
  if (time < 10) {
    return `0${time}:00`;
  } else {
    return `${time}:00`;
  }
}
export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayOfWeek = dayNames[date.getDay()];
  const day = date.getDate();
  let daySuffix;
  if (day > 3 && day < 21) daySuffix = 'th';
  else daySuffix = ['th', 'st', 'nd', 'rd'][day % 10] || 'th';
  
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayOfWeek},  ${month} ${day}${daySuffix}, ${year}`;
}
export const formatTime = (time: number) => {
    if(time < 12){
        return time + ` AM`;
    } else if(time === 12) {
        return time + ` PM`;
    } else {
        return (time - 12) + ` PM`;
    }
}
export const formatTimeRange = (start: Date, end: Date) => {
  let startHour = start.getHours();
  const startMinutes = start.getMinutes().toString().padStart(2, '0');
  let startPeriod = startHour >= 12 ? 'PM' : 'AM';

  startHour = startHour % 12;
  startHour = startHour ? startHour : 12; // the hour '0' should be '12'
  
  let endHour = end.getHours();
  const endMinutes = end.getMinutes().toString().padStart(2, '0');
  let endPeriod = endHour >= 12 ? 'PM' : 'AM';

  endHour = endHour % 12;
  endHour = endHour ? endHour : 12; // the hour '0' should be '12'
  
  return `${startHour}:${startMinutes} ${startPeriod} — ${endHour}:${endMinutes} ${endPeriod}`;
}
export const formatISODateWithStringWithSuffix = (date: Date | string) => {
  const formattedDate = new Date(date);

  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString('default', { month: 'short' });
  const year = formattedDate.getFullYear();

  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }

  return `${month} ${day}${daySuffix}, ${year}`;
};
export const generateDayTimeSlots = (start: Date, end: Date, id: string) => {
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

export const isoDateConverter = (date: Date | string) => {
  const convertToAdjustedDate = (dateObj: Date) => {
    const offset = dateObj.getTimezoneOffset() * 60000; 
    return new Date(dateObj.getTime() - offset + (8 * 60 * 60000)); 
  };

  if (typeof date === 'string') {
    const newDate = new Date(date);
    return convertToAdjustedDate(newDate);
  } else {
    return convertToAdjustedDate(date);
  }
};
export const convertTimeStringToISODate = (time: string , date: Date): Date => {
  if (!time) {
    return new Date();
  }
  let hours: string, minutes: string;

  if (typeof time === 'string') {
    [hours, minutes] = time.split(':');
  } else {
    throw new Error('Invalid time format');
  }

  const newDate = new Date(date);
  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return newDate;
};
export const convertTimeStringDateToISODate = (time: string , day: string, date: Date): Date => {
  if (!time) {
    return new Date();
  }
  let hours: string, minutes: string;

  if (typeof time === 'string') {
    [hours, minutes] = time.split(':');
  } else {
    throw new Error('Invalid time format');
  }
  
  const currentDate = generateDateForDay(day, date);
  const newDate = new Date(currentDate);
  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return newDate;
};
export const getWorkingTimeUnavailability = (start: Date, end: Date, openingTime: number, closingTime: number) => {
  const unavailableSlots = [];

  const startHour = start.getHours();
  const endHour = end.getHours();
  
  if (startHour > openingTime) {
    unavailableSlots.push({ 
      start: new Date(start.getFullYear(), start.getMonth(), start.getDate(), openingTime, 0, 0, 0), 
      end: new Date(start) 
    });
  }

  if (endHour < closingTime) {
    unavailableSlots.push({ 
      start: new Date(end), 
      end: new Date(end.getFullYear(), end.getMonth(), end.getDate(), closingTime, 0, 0, 0) 
    });
  }

  return unavailableSlots;
};
export const calculateQuarterHours = (start: Date, end: Date, openingTime: number) => {
  const startMinutes = (start.getHours() - openingTime) * 60 + start.getMinutes();
  const endMinutes = (end.getHours() - openingTime) * 60 + end.getMinutes();
  const totalMinutes = endMinutes - startMinutes;
  const totalQuarterHours = Math.floor(totalMinutes / 15);
  return totalQuarterHours;
};
export const calculatePositionAndSizeOfUnvailableDayWorkingTime = (start: Date, end: Date, openingTime:number,  gridColWidth: number, index: number) => {
  const calculateStartPosition = (start: Date) => {
    const startMinutes = (start.getHours() - openingTime) * 60 + start.getMinutes();
    const yPosition = Math.floor(startMinutes / 15);
    const xPosition = (index * gridColWidth) + 96 
    return {x: xPosition, y: yPosition * 30};
  };



  const position = calculateStartPosition(start);
  const size = calculateQuarterHours(start, end, openingTime);


  return { position, size };
}
export const calculatePositionAndSizeOfUnvailableWeekWorkingTime = (start: Date, end: Date, id: string, openingTime:number, dentists: IDentistData[],  gridColWidth: number,) => {
  const calculateStartPosition = (start: Date, openingTime: number) => {
    const index = dentists.findIndex(dentist => dentist._id === id);
    const daysOfWeekOrder = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const daysOfWeek = [ "Sunday",  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
    

    // position the appointment to the right dentist based on the schedule
    const behindDentistSchedule = dentists.slice(0, index ).map(dentist => dentist.dentistSchedule);
    const flatSchedule = behindDentistSchedule.flat()
    const scheduleCount = flatSchedule.length;


    // get the correct day 
    const getDentistScheduleById = (dentists: IDentistData[], id: string) => {
      const dentist = dentists.find(dentist => dentist._id === id);
      return dentist ? dentist.dentistSchedule : null;
    };
    
    
    const dentistSchedule = getDentistScheduleById(dentists, id);
    const sortedDentistSchedule = dentistSchedule ? dentistSchedule.sort((a, b) => {
      return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
    }) : []

    const dayIndex = start.getDay();
    const day = daysOfWeek[dayIndex]



    const scheduleIndex = sortedDentistSchedule?.findIndex(schedule => schedule.day === day) 


    const startMinutes = (start.getHours() - openingTime) * 60 + start.getMinutes();
    const yPosition = Math.floor(startMinutes / 15);
    const xPosition = ((scheduleCount + scheduleIndex) * gridColWidth ) + 96 
    return {x: xPosition, y: yPosition * 30};
  };


  const position = calculateStartPosition(start, openingTime);
  const size = calculateQuarterHours(start, end, openingTime);


  return { position, size: size * 30 };
}
export const calculatePositionAndSizeOfDayAppointments = (start: string, end: string, id:string, dentists: IDentistData[], gridColWidth: number, openingTime:number) => {
  //  get the actual size of the time and end itme
  // get the distance betweent he opening and the starting time 
  const calculateStartPosition = (start: Date, openingTime: number) => {
    const index = dentists.findIndex(dentist => dentist._id === id);
    const startMinutes = (start.getHours() - openingTime) * 60 + start.getMinutes();
    const yPosition = Math.floor(startMinutes / 15);
    const xPosition = (index * gridColWidth) + 96 
    return {x: xPosition, y: yPosition * 30};
  };

  const position = calculateStartPosition(removeDateOffset(start), openingTime);
  const size = calculateQuarterHours(removeDateOffset(start), removeDateOffset(end), openingTime);
 
  return { position, size };
};
export const calculatePositionAndSizeOfWeekAppointments = (start: string, end: string, id:string, dentists: IDentistData[], gridColWidth: number, openingTime:number) => {


const calculateStartPosition = (start: Date, openingTime: number) => {
  const index = dentists.findIndex(dentist => dentist._id === id);
  const daysOfWeekOrder = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const daysOfWeek = [ "Sunday",  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
  

  // position the appointment to the right dentist based on the schedule
  const behindDentistSchedule = dentists.slice(0, index ).map(dentist => dentist.dentistSchedule);
  const flatSchedule = behindDentistSchedule.flat()
  const scheduleCount = flatSchedule.length;

  // get the correct day 
  const getDentistScheduleById = (dentists: IDentistData[], id: string) => {
    const dentist = dentists.find(dentist => dentist._id === id);
    return dentist ? dentist.dentistSchedule : null;
  };

  
  const dentistSchedule = getDentistScheduleById(dentists, id);
  const sortedDentistSchedule = dentistSchedule ? dentistSchedule.sort((a, b) => {
    return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
  }) : []

  const dayIndex = start.getDay();
  const day = daysOfWeek[dayIndex]


  const scheduleIndex = sortedDentistSchedule?.findIndex(schedule => schedule.day === day) ?? 0

  const startMinutes = (start.getHours() - openingTime) * 60 + start.getMinutes();
  const yPosition = Math.floor(startMinutes / 15);
  const xPosition = ((scheduleCount + scheduleIndex) * gridColWidth ) + 96 
  return {x: xPosition, y: yPosition * 30};};

  
  const position = calculateStartPosition(removeDateOffset(start), openingTime);
  const size = calculateQuarterHours(removeDateOffset(start), removeDateOffset(end), openingTime);
 
  return { position, size };
};

export const calculateLunchBreakPosition = (start: Date, end: Date, openingTime: number) => {

  const calculateStartPosition = (start: Date, openingTime: number ) => {
    const startMinutes = (start.getHours() - openingTime) * 60 + start.getMinutes();
    const yPosition = Math.floor(startMinutes / 15);
    return { y: yPosition * 30};
  };

  const position = calculateStartPosition(start, openingTime);
  const size = calculateQuarterHours(start, end, openingTime);
  return { lunchPosition: position.y, lunchSize:size };

}
export const calculateNumberOfDentistAppointments = (dentist: IDentistData | null, appointments: IAppointmentResponse[] | undefined, date: Date) => {
  if (!dentist || !appointments ) return 0;
  return appointments.reduce((count, appointment) => {
    const appointmentDate = new Date(appointment.appointmentData.appointmentDate.start);
    return (
      appointment.dentistData._id === dentist._id &&
      appointmentDate.getFullYear() === date.getFullYear() &&
      appointmentDate.getMonth() === date.getMonth() &&
      appointmentDate.getDate() === date.getDate()
    ) ? count + 1 : count;
  }, 0);
}
export const calculateNumberOfTotalAppointments = (appointments: IAppointmentResponse[] | undefined, date: Date) => {
  if (!appointments) return 0;
  return appointments.reduce((count, appointment) => {
    const appointmentDate = new Date(appointment.appointmentData.appointmentDate.start);
    return (
      appointmentDate.getFullYear() === date.getFullYear() &&
      appointmentDate.getMonth() === date.getMonth() &&
      appointmentDate.getDate() === date.getDate()
    ) ? count + 1 : count;
  }, 0);
}

export const calculateNumberOfAvailableTimeSlots = (
  occupiedTimeSlots: ITimeSlot[],
  start: string,
  openingTime: number,
  closingTime: number,
  id: string,
  date: Date,
): { start: string; end: string } => {


  const day = start.split("-")[1]

  const formatTime = (time: number): string => {
    return time < 10 ? `0${time}:00-${day}` : `${time}:00-${day}`;
  };

  const setTimeOnDate = (date: Date, time: number): Date => {
    const newDate = new Date(date);
    newDate.setHours(time, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds
    return newDate;
  };

  const openingDate = setTimeOnDate(date, openingTime);
  const closingDate = setTimeOnDate(date, closingTime);


  const timeSlots = generateDayTimeSlots(openingDate, closingDate, id);

  const timeSplitter = timeSlots.findIndex(slot => slot.time === start);

  const startTimeSlots = timeSlots.slice(0, timeSplitter).reverse()
  const endTimeSlots = timeSlots.slice(timeSplitter, timeSlots.length)

  const formattedOpeningTime = formatTime(openingTime);
  const formattedClosingTime = formatTime(closingTime);

  let finalStart = ""
  let finalEnd = ""

  const firstStartTimeSlot = startTimeSlots.find(timeSlot => {
    return occupiedTimeSlots.some(occupiedTimeSlot => occupiedTimeSlot.time === timeSlot.time);
  }) || { time: formattedOpeningTime };


  const firstEndTimeSlot = endTimeSlots.find(timeSlot => {
    return occupiedTimeSlots.some(occupiedTimeSlot => occupiedTimeSlot.time === timeSlot.time) ?? formattedClosingTime
  })


  if (firstStartTimeSlot) { 
    const startTimeIndex = timeSlots.findIndex(slot => slot.time === firstStartTimeSlot.time)
    const startTime = timeSlots[startTimeIndex].time; 
    finalStart = startTime.split("-")[0] 
  } else { 
    finalStart = formattedOpeningTime.split("-")[0] 
  }

  
  if (firstEndTimeSlot) { 
    const endTimeIndex = timeSlots.findIndex(slot => slot.time === firstEndTimeSlot.time) 
    const endTime = timeSlots[endTimeIndex].time 
    finalEnd = endTime.split("-")[0] 
  } else { 
    finalEnd = formattedClosingTime.split("-")[0] 
  }


  return {
    start: finalStart,
    end: finalEnd
  };
};


export const getStartTime = (index: number, openingTime: number, closingTime:number, date: Date) => {
  // 
  let formattedOpeningTime = new Date(date)
  formattedOpeningTime.setHours(openingTime, 0, 0, 0);
// 
  let formattedClosingTime = new Date(date)
  formattedClosingTime.setHours(closingTime, 0, 0, 0);

  const timeSlots = generateDayTimeSlots(formattedOpeningTime,formattedClosingTime, "i-" )
  return timeSlots[index].time
}

