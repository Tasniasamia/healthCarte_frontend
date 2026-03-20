"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ISchedule } from "@/types/schedule.types";

export const getAllSchedules = async (urlQuerires: string) => {
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

export const getScheduleById = async (id: string) => {
  try {
    const response = await httpClient.get<ISchedule>(`/schedule/${id}`);
    if (!response.success) throw new Error("Failed to fetch schedule");
    return response;
  } catch (error) {
    console.error("Failed to fetch schedule", error);
    throw error;
  }
};

export const createSchedule = async (payload: {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}) => {
  try {
    const response = await httpClient.post<any>("/schedule", payload);
    if (!response.success) throw new Error("Failed to create schedule");
    return response;
  } catch (error) {
    console.error("Failed to create schedule", error);
    throw error;
  }
};

export const updateSchedule = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
  };
}) => {
  try {
    const response = await httpClient.patch<any>(`/schedule/${id}`, payload);
    if (!response.success) throw new Error("Failed to update schedule");
    return response;
  } catch (error) {
    console.error("Failed to update schedule", error);
    throw error;
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    const response = await httpClient.delete<any>(`/schedule/${id}`);
    if (!response.success) throw new Error("Failed to delete schedule");
    return response;
  } catch (error) {
    console.error("Failed to delete schedule", error);
    throw error;
  }
};