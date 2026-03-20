// types/doctorSchedule.types.ts
export interface IDoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  schedule?: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };
}