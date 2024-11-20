
export interface ISchedule {
  day: string;
  start: string;
  end: string;
}

export type IScheduleResponse = {
  schedules: ISchedule[];
}

export type AvailabilityResponse = {
  day: number;
  date: string;
  isAlmostFull: boolean;
  isFull: boolean;

}

export type DentistDateAvailabilityResponse = {
  schedule: ISchedule[]
  availability: AvailabilityResponse[]
} 
