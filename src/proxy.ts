import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwtUtils";
import { JwtPayload } from "jsonwebtoken";
import { defaultRoute, routeOwner } from "./lib/auth.utils";

export const proxy=async(req:NextRequest)=>{
const {pathname}=req?.nextUrl;
const accessToken=req.cookies.get('accessToken')?.value;

let userRole:string | undefined;
const verifyAccessToken=await verifyToken(accessToken as string,process.env.ACCESS_TOKEN_SECRET as string)  ;
if(verifyAccessToken){
userRole=verifyAccessToken?.role;
}
const routeowner=await routeOwner(pathname as string);
if(routeowner === null){
  return NextResponse.next();
}
if(!accessToken){
  let loginURL=new URL('/login');
  loginURL.searchParams.set('redirect',pathname)
return NextResponse.redirect(loginURL)
}
if(routeowner === 'COMMON'){
  return NextResponse.next();

}
if(routeowner !== userRole ){
 return NextResponse.redirect(new URL(defaultRoute(userRole as string)))
}
return NextResponse.next();
}

export const config = {
    matcher: [
      // Exclude API routes, static files, image optimizations, and .png files
      '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
  }