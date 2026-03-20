// types/schedule.types.ts
export interface ISchedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
  appointments?: any[];
  doctorSchedules?: any[];
}