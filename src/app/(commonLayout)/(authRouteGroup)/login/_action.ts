"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { setTokenInCookie } from "@/lib/token.utils"
import { ILoginPayloadType } from "@/types/api.types"
import { ILoginResponse } from "@/types/auth.types"
import { authValidationSchema } from "@/zod/auth.validation"


export const createLogin = async (payload:ILoginPayloadType) => {
    try{
        const parsePayload:any=authValidationSchema.loginSchema.safeParse(payload);
        if(!parsePayload){
          return{  success:false,
            message:`zod validation error. ${parsePayload?.error}`
          }
        }
        const response = await httpClient.post<ILoginResponse>('/auth/login',payload)
        const {accessToken,refreshToken,token}=await response.data;
        await setTokenInCookie('accessToken',accessToken);
        await setTokenInCookie('refreshToken',refreshToken);
        await setTokenInCookie('better-auth.session_token',token);

        return response.data;

    }
    catch(error:any){
        return {
            success:false,
            message:`Login failed: ${error?.message}`
        }
    }
 
}