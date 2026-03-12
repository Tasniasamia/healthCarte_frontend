"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IDoctor } from "@/types/doctor.types"




export const getDoctorData = async () => {
  const response = await httpClient.get<IDoctor[]>('/doctor')
  return response.data
}