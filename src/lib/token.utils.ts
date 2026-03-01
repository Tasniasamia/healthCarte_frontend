import jwt, { JwtPayload } from 'jsonwebtoken'
import { setCookie } from './cookies.utils';
const jwtSecret=process.env.JWT_TOKEN_SECRET as string
export const getRemaingSecondsToken=(token:string):number=>{

if(!token || !jwtSecret){ return 0;}
const tokenPayload=jwtSecret?jwt.verify(token,jwtSecret) as JwtPayload:jwt.decode(token) as JwtPayload

if(!tokenPayload || (tokenPayload && !tokenPayload?.exp)){
    return 0;
}
const remainingSecods=(tokenPayload?.exp as any)- Math.floor(Date.now()/1000)

return remainingSecods>0?remainingSecods:0


}


export const setTokenInCookie=async(name:string,token:string)=>{
   const maxAgeInSecods= getRemaingSecondsToken(token as string) ;
    await setCookie(name,token,maxAgeInSecods)

}