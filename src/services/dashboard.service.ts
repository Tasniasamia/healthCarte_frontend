"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { PieChartData } from "@/types/dashboard.types"



export const getPieChartData = async () => {
  const response = await httpClient.get<PieChartData[]>('/stats/pie-chart')
  return response.data
}