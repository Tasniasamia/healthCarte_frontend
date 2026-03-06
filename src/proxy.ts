import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwtUtils";
import { JwtPayload } from "jsonwebtoken";
import { defaultRoute, isAuthRoute, routeOwner } from "./lib/auth.utils";
import { isExpired, isWillExpiredSoon } from "./lib/token.utils";
import { getNewTokens } from "./services/auth.service";

export const refreshTokenMiddleware=async(rereshToken:string)=>{
try{
const isValidateRefreshToken=await getNewTokens(rereshToken);
if(isValidateRefreshToken){
  return true;
}
return false;
}
catch(error:any){
  return false;
}
}

export const proxy=async(req:NextRequest)=>{
const {pathname}=req?.nextUrl;
const accessToken=req.cookies.get('accessToken')?.value;
const refreshToken = req.cookies.get("refreshToken")?.value;

let userRole:string | undefined;
const verifyAccessToken=await verifyToken(accessToken as string,process.env.ACCESS_TOKEN_SECRET as string)  ;
if(verifyAccessToken){
userRole=verifyAccessToken?.role === 'SUPER_ADMIN'?'ADMIN':verifyAccessToken?.role;
}
//Rule-1 user logged in but trying to go to auth routes rediect default dashboard
if((await isAuthRoute(pathname)) && verifyAccessToken){
  return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
 }


//Rule-2 refresh token procedure
 if (verifyAccessToken && refreshToken && isWillExpiredSoon(accessToken as string)) {
  
  const requestHeaders = new Headers(req.headers);
  
  const response = NextResponse.next({
    request: { headers: requestHeaders }
  });

  try {
   
    const tokenData = await getNewTokens(refreshToken);

    if (tokenData) {
      requestHeaders.set("x-token-refreshed", "1");

      response.cookies.set("accessToken", tokenData.accessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
      response.cookies.set("refreshToken", tokenData.refreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
      response.cookies.set("sessionToken", tokenData.sessionToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
      headers: response.headers, // ✅ cookies সহ headers pass করো
    });

  } catch (error) {
    console.error("Error refreshing token:", error);
  }

  return response;
}





const routeowner=await routeOwner(pathname as string);
//Rule-3 if routeowner is null and not accesstoken , so he can redirect

if((routeowner === null) && !accessToken){
  return NextResponse.next();
}
//Rule-4 if not accesstoken here. but trying to redirect protected route
if(!accessToken){
  let loginURL = new URL('/login', req.url);
   loginURL.searchParams.set('redirect',pathname)
return NextResponse.redirect(loginURL)
}
//Rule-5 if routeowner is common trying to go to /my-profile or /changePassword page

if(routeowner === 'COMMON'){
  return NextResponse.next();

}
//Rule-6 if routeowner and userRole are not matched , we will redirect him defaultRoute exp: userRole===admin && rediect(/admin/dashboard)
if(routeowner !== userRole ){
 return NextResponse.redirect(new URL(defaultRoute(userRole as string),req?.url))
}
return NextResponse.next();
}

export const config = {
    matcher: [
      // Exclude API routes, static files, image optimizations, and .png files
      '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
  }