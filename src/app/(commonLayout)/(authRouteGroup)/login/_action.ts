"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookie } from "@/lib/token.utils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginPayloadType, ILoginResponse } from "@/types/auth.types";
import { authValidationSchema } from "@/zod/auth.validation";

export const createLoginAction = async (payload: ILoginPayloadType):Promise<ILoginResponse|ApiErrorResponse> => {
  try {
    const parsePayload: any =
      authValidationSchema.loginSchema.safeParse(payload);
    if (!parsePayload) {
      return {
        success: false,
        message: `zod validation error. ${parsePayload?.error}`,
      };
    }
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      payload
    );
    const { accessToken, refreshToken, token } = await response.data;
    console.log("response",response?.data);
    await setTokenInCookie("accessToken", accessToken,(process?.env.ACCESS_TOKEN_SECRET as string));
    await setTokenInCookie("refreshToken", refreshToken,(process?.env.REFRESH_TOKEN_SECRET as string));
    await setTokenInCookie("better-auth.session_token", token);
    return response.data;
  } catch (error: any) {
    console.log("error:any",error?.message);
    return {
      success: false,
      message: `Login failed: ${error?.message}`,
    };
  }
};


