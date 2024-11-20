import { ISchedule } from "@features/admin/staff/types/schedule.types";



export const isWorkingDay = (date: Date, schedules: ISchedule[]): boolean => {
  return schedules.some((schedule) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayName = dayNames[date.getDay()];
    return schedule.day === currentDayName;
  });
}