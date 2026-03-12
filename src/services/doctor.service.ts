"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";

export const getAllDoctors = async () => {
  try {
    const response = await httpClient.get<IDoctor[]>("/doctor");
    if(!response.success) {
      throw new Error("Failed to fetch doctors");
    }
    return response;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
    throw error;
  }
};