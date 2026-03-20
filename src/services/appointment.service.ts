"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const createAppointment = async (payload: {
  doctorId: string;
  scheduleId: string;
}) => {
  try {
    const response = await httpClient.post<any>("/appointment", payload);
    if (!response.success) throw new Error("Failed to create appointment");
    console.log("response",response);
   
    return response;
  } catch (error) {
    console.error("Failed to create appointment", error);
    throw error;
  }
};