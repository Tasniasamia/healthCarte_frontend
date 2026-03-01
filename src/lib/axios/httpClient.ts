import { ApiResponse } from "@/types/api.types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}
const axiosInstance =()=>{
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers:{
      'Content-Type' : 'application/json',
  }
  });
}


export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const httpGet = async <TData>(endPoint: string, options?: ApiRequestOptions):Promise<ApiResponse<TData>> => {
  try {        
    const response = await axiosInstance().get<ApiResponse<TData>>(endPoint, {
        params: options?.params,
        headers: options?.headers,
    });
    return response.data;
} catch (error) {       
    console.error(`GET request to ${endPoint} failed:`, error);
    throw error;
}
};

const httpPost = async <TData>(
  endPoint: string,
  payload: Record<string, any>,
  options?: ApiRequestOptions
):Promise<ApiResponse<TData>> => {
  try {        
    const response = await axiosInstance().post<ApiResponse<TData>>(endPoint,payload,{
        params: options?.params,
        headers: options?.headers,
    });
    return response.data;
} catch (error) {       
    console.error(`GET request to ${endPoint} failed:`, error);
    throw error;
}
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
};