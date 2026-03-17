"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";

export const getAllDoctors = async (urlQuerires:string) => {
  try {
    const response = await httpClient.get<IDoctor[]>(urlQuerires?`/doctor?${urlQuerires}`:'/doctor');
    if(!response.success) {
      throw new Error("Failed to fetch doctors");
    }
    return response;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
    throw error;
  }
};