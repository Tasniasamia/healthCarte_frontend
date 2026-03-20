"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ISchedule } from "@/types/schedule.types";
import { IDoctorSchedule } from "@/types/doctorSchedule.types";

// ✅ সব available schedules
export const getAllSchedules = async (urlQuerires?: string) => {
  try {
    const response = await httpClient.get<ISchedule[]>(
      urlQuerires ? `/schedule?${urlQuerires}` : "/schedule"
    );
    if (!response.success) throw new Error("Failed to fetch schedules");
    return response;
  } catch (error) {
    console.error("Failed to fetch schedules", error);
    throw error;
  }
};

// ✅ doctor এর নিজের selected schedules
export const getMySchedules = async () => {
  try {
    const response = await httpClient.get<IDoctorSchedule[]>(
      "/doctor-schedule/my_schedule"
    );
    if (!response.success) throw new Error("Failed to fetch my schedules");
    return response;
  } catch (error) {
    console.error("Failed to fetch my schedules", error);
    throw error;
  }
};

// ✅ নতুন schedule add
export const addDoctorSchedule = async (payload: { scheduleId: string[] }) => {
  try {
    const response = await httpClient.post<any>("/doctor-schedule", payload);
    if (!response.success) throw new Error("Failed to add schedule");
    return response;
  } catch (error) {
    console.error("Failed to add schedule", error);
    throw error;
  }
};

// ✅ schedule update — shouldDelete true/false
export const updateDoctorSchedule = async (payload: {
  scheduleId: { id: string; shouldDelete: boolean }[];
}) => {
  try {
    const response = await httpClient.patch<any>("/doctor-schedule", payload);
    if (!response.success) throw new Error("Failed to update schedule");
    return response;
  } catch (error) {
    console.error("Failed to update schedule", error);
    throw error;
  }
};

export const deleteDoctorSchedule = async (scheduleId: string) => {
  try {
    const response = await httpClient.delete<any>(`/doctor-schedule/${scheduleId}`);
    if (!response.success) throw new Error("Failed to delete schedule");
    return response;
  } catch (error) {
    console.error("Failed to delete schedule", error);
    throw error;
  }
};