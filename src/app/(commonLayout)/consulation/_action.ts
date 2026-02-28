"use server"

import { httpClient } from "@/lib/axios/httpClient"




export const getDoctorData = async () => {
  const response = await httpClient.get('/doctor')
  return response.data
}