"use server"

import { httpClient } from "@/lib/axios/httpClient"



interface TDoctor{
  id:string,
  name:string,
  email:string,
  
}
export const getDoctorData = async () => {
  const response = await httpClient.get<TDoctor[]>('/doctor')
  return response.data
}