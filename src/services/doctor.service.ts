"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";
import { ISpecialty } from "@/types/speciality.types";

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


export const getAllSpecialties = async () => {
    try {
        const specialties = await httpClient.get<ISpecialty[]>("/specialties");
        return specialties;
    } catch (error) {
        console.log("Error fetching specialties:", error);
        throw error;
    }
}