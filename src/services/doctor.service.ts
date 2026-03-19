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

export const getAllSpecialities = async () => {
  try {
    const response = await httpClient.get<ISpecialty[]>("/speciality");
    if (!response.success) {
      throw new Error("Failed to fetch specialities");
    }
    return response;
  } catch (error) {
    console.error("Failed to fetch specialities", error);
    throw error;
  }
};
 
// export const createDoctor = async (payload: any) => {
//   try {
//     console.log("paylaod in service", payload);
//     const response :any= await httpClient.post<any>("/user/create-doctor", payload);
//     console.log("Doctor created successfully", response);
//     if (!response.ok) {
//       throw new Error("Failed to create doctor");
//     }
//     return response;
//   } catch (error) {
//     console.error("Failed to create doctor", error);
//     throw error;
//   }
// };


export const createDoctor = async (payload: any) => {
  try {
    const response = await httpClient.post<any>("/user/create-doctor", payload);
    if (!response.success) {
      throw new Error("Failed to create doctor");
    }
    return response;
  } catch (error) {
    console.error("Failed to create doctor", error);
    throw error;
  }
};