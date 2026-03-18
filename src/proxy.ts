// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./lib/jwtUtils";
// import { JwtPayload } from "jsonwebtoken";
// import { defaultRoute, isAuthRoute, routeOwner } from "./lib/auth.utils";
// import { isExpired, isWillExpiredSoon } from "./lib/token.utils";
// import { getNewTokens,  getUserInfoMiddleware } from "./services/auth.service";

// export const refreshTokenMiddleware=async(rereshToken:string)=>{
// try{
// const isValidateRefreshToken=await getNewTokens(rereshToken);
// if(isValidateRefreshToken){
//   return true;
// }
// return false;
// }
// catch(error:any){
//   return false;
// }
// }

// export const proxy=async(req:NextRequest)=>{
// const {pathname}=req?.nextUrl;
// const accessToken=req.cookies.get('accessToken')?.value;
// const refreshToken = req.cookies.get("refreshToken")?.value;

// let userRole:string | undefined;
// const verifyAccessToken=await verifyToken(accessToken as string,process.env.ACCESS_TOKEN_SECRET as string)  ;
// if(verifyAccessToken){
// userRole=verifyAccessToken?.role === 'SUPER_ADMIN'?'ADMIN':verifyAccessToken?.role;
// }
// //Rule-1 user logged in but trying to go to auth routes rediect default dashboard
// if((await isAuthRoute(pathname)) && verifyAccessToken){
//   return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
//  }

// //Rule-2
//  if (pathname === '/reset-password') {
//   const url = new URL(req.url);
//   const email = url.searchParams.get('email');

//   if (!email) {
//     const loginURL = new URL('/login', req.url);
//     loginURL.searchParams.set('redirect', pathname);
//     return NextResponse.redirect(loginURL);
//   }

//   if (!accessToken) {
//     return NextResponse.next();
//   }

//   const user = await getUserInfoMiddleware(req);
//   if (user?.needPasswordChanges) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
// }




// //Rule-3 refresh token procedure

// //  if (verifyAccessToken && refreshToken && isWillExpiredSoon(accessToken as string)) {
  
// //   const requestHeaders = new Headers(req.headers);
  
// //   const response = NextResponse.next({
// //     request: { headers: requestHeaders }
// //   });

// //   try {
   
// //     const tokenData = await getNewTokens(refreshToken);

// //     if (tokenData) {
// //       requestHeaders.set("x-token-refreshed", "1");

// //       response.cookies.set("accessToken", tokenData.accessToken, {
// //         httpOnly: true,
// //         path: "/",
// //         sameSite: "strict",
// //       });
// //       response.cookies.set("refreshToken", tokenData.refreshToken, {
// //         httpOnly: true,
// //         path: "/",
// //         sameSite: "strict",
// //       });
// //       response.cookies.set("sessionToken", tokenData.sessionToken, {
// //         httpOnly: true,
// //         path: "/",
// //         sameSite: "strict",
// //       });
// //     }

// //     return NextResponse.next({
// //       request: { headers: requestHeaders },
// //       headers: response.headers, // ✅ cookies সহ headers pass করো
// //     });

// //   } catch (error) {
// //     console.error("Error refreshing token:", error);
// //   }

// //   return response;
// // }

// //Rule-3 refresh token procedure

// if (verifyAccessToken && refreshToken && isWillExpiredSoon(accessToken as string)) {
  
//   const requestHeaders = new Headers(req.headers);

//   try {
//     const tokenData = await getNewTokens(refreshToken);

//     if (tokenData) {
//       requestHeaders.set("x-token-refreshed", "1");

//       const response = NextResponse.next({
//         request: { headers: requestHeaders }
//       });

//       response.cookies.set("accessToken", tokenData.accessToken, {
//         httpOnly: true,
//         path: "/",
//         sameSite: "strict",
//       });
//       response.cookies.set("refreshToken", tokenData.refreshToken, {
//         httpOnly: true,
//         path: "/",
//         sameSite: "strict",
//       });
//       response.cookies.set("sessionToken", tokenData.sessionToken, {
//         httpOnly: true,
//         path: "/",
//         sameSite: "strict",
//       });

//       // ✅ নতুন token দিয়ে user check করুন এখানেই
//       const newReq = new NextRequest(req.url, {
//         headers: new Headers({
//           ...Object.fromEntries(req.headers),
//           cookie: [
//             `accessToken=${tokenData.accessToken}`,
//             `refreshToken=${tokenData.refreshToken}`,
//             `sessionToken=${tokenData.sessionToken}`,
//           ].join("; "),
//         }),
//       });

//       const user = await getUserInfoMiddleware(newReq);

//       if (user?.needPasswordChanges && pathname !== '/reset-password') {
//         const resetURL = new URL('/reset-password', req.url);
//         const redirectResponse = NextResponse.redirect(resetURL);
//         // ✅ নতুন token গুলো redirect response এও set করুন
//         redirectResponse.cookies.set("accessToken", tokenData.accessToken, { httpOnly: true, path: "/", sameSite: "strict" });
//         redirectResponse.cookies.set("refreshToken", tokenData.refreshToken, { httpOnly: true, path: "/", sameSite: "strict" });
//         redirectResponse.cookies.set("sessionToken", tokenData.sessionToken, { httpOnly: true, path: "/", sameSite: "strict" });
//         return redirectResponse;
//       }

//       return response;
//     }

//   } catch (error) {
//     console.error("Error refreshing token:", error);
//   }

//   return NextResponse.next({ request: { headers: requestHeaders } });
// }

// //Rule-4

// // if(accessToken && verifyAccessToken){
// //   const user = await getUserInfoMiddleware(req);
// //   if(user){

// //     console.log("user",user);
// //     if(user.emailVerified === false){
 
// //       if((pathname !== "/verify-email") ){
// //           const verifyEmailUrl = new URL("/verify-email", req.url);
// //           verifyEmailUrl.searchParams.set("email", user?.email);
// //           return NextResponse.redirect(verifyEmailUrl);
// //       }

// //       return NextResponse.next();
// //   }

// //   if(user.emailVerified && pathname === "/verify-email"){
// //       return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
// //   }



// //     if (user && user?.needPasswordChanges && (pathname !== '/reset-password')) {
// //       return NextResponse.redirect(new URL('/reset-password',req.url));
// //     }
// //     if (user && !user?.needPasswordChanges && (pathname === '/reset-password')) {
// //       return NextResponse.redirect(new URL(defaultRoute(userRole as string),req?.url))
// //     }
// //   }

// // }

// //Rule-4
// if (accessToken && verifyAccessToken && !isWillExpiredSoon(accessToken)) {
//   const user = await getUserInfoMiddleware(req);

//   if (user) {
//     console.log("user", user);

//     // email verify হয়নি
//     if (user.emailVerified === false) {
//       if (pathname !== "/verify-email") {
//         const verifyEmailUrl = new URL("/verify-email", req.url);
//         verifyEmailUrl.searchParams.set("email", user?.email);
//         return NextResponse.redirect(verifyEmailUrl);
//       }
//       return NextResponse.next();
//     }

//     // email verified কিন্তু verify-email page এ আছে
//     if (user.emailVerified && pathname === "/verify-email") {
//       return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
//     }

//     // password change দরকার
//     if (user.needPasswordChanges && pathname !== '/reset-password') {
//       return NextResponse.redirect(new URL('/reset-password', req.url));
//     }

//     // password change দরকার নেই কিন্তু reset-password এ আছে
//     if (!user.needPasswordChanges && pathname === '/reset-password') {
//       return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
//     }
//   }
// }






// const routeowner=await routeOwner(pathname as string);
// //Rule-5 if routeowner is null and not accesstoken , so he can redirect

// if((routeowner === null)){
//   return NextResponse.next();
// }
// //Rule-5 if not accesstoken here. but trying to redirect protected route
// if(!accessToken){
//   let loginURL = new URL('/login', req.url);
//    loginURL.searchParams.set('redirect',pathname)
// return NextResponse.redirect(loginURL)
// }
// //Rule-5 if routeowner is common trying to go to /my-profile or /changePassword page

// if(routeowner === 'COMMON'){
//   return NextResponse.next();

// }
// //Rule-6 if routeowner and userRole are not matched , we will redirect him defaultRoute exp: userRole===admin && rediect(/admin/dashboard)
// if(routeowner !== userRole ){
//  return NextResponse.redirect(new URL(defaultRoute(userRole as string),req?.url))
// }
// return NextResponse.next();
// }

// export const config = {
//     matcher: [
//       // Exclude API routes, static files, image optimizations, and .png files
//       '/((?!api|_next/static|_next/image|.*\\.png$).*)',
//     ],
//   }



import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwtUtils";
import { defaultRoute, isAuthRoute, routeOwner } from "./lib/auth.utils";
import { isWillExpiredSoon } from "./lib/token.utils";
import { getNewTokens, getUserInfoMiddleware } from "./services/auth.service";

const setTokenCookies = (response: NextResponse, tokenData: { accessToken: string; refreshToken: string; sessionToken: string }) => {
  response.cookies.set("accessToken", tokenData.accessToken, { httpOnly: true, path: "/", sameSite: "strict" });
  response.cookies.set("refreshToken", tokenData.refreshToken, { httpOnly: true, path: "/", sameSite: "strict" });
  response.cookies.set("sessionToken", tokenData.sessionToken, { httpOnly: true, path: "/", sameSite: "strict" });
};

const buildResetPasswordURL = (baseUrl: string, email: string) => {
  const url = new URL('/reset-password', baseUrl);
  url.searchParams.set('email', email); // ✅ সবসময় email সহ redirect
  return url;
};

export const proxy = async (req: NextRequest) => {
  const { pathname } = req?.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value as any;

  let userRole: string | undefined;
  const verifyAccessToken = await verifyToken(
    accessToken as string,
    process.env.ACCESS_TOKEN_SECRET as string
  );

  if (verifyAccessToken) {
    userRole = verifyAccessToken?.role === 'SUPER_ADMIN' ? 'ADMIN' : verifyAccessToken?.role;
  }

  // ============================================
  // Rule-1: Logged in user → auth route এ গেলে dashboard এ
  // ============================================
  if ((await isAuthRoute(pathname)) && verifyAccessToken) {
      // verify-email বা reset-password এ থাকলে redirect করো না
  if (pathname === '/verify-email' || pathname === '/reset-password') {
    return NextResponse.next();
  }
    return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
  }

  // ============================================
  // Rule-2: /reset-password handling
  // ============================================
  if (pathname === '/reset-password') {
    const email = new URL(req.url).searchParams.get('email');

    if (!email) {
      // email নেই → login এ পাঠাও
      const loginURL = new URL('/login', req.url);
      loginURL.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginURL);
    }

    if (!accessToken) {
      return NextResponse.next(); // token নেই → reset page দেখাও
    }

    const user = await getUserInfoMiddleware(req);

    if (user?.needPasswordChanges) {
      return NextResponse.next(); // password change দরকার → page দেখাও
    }

    // password change দরকার নেই → dashboard এ
    return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
  }

  // ============================================
  // Rule-3: Token expire হওয়ার আগে refresh
  // ============================================
  if (verifyAccessToken || refreshToken || isWillExpiredSoon(accessToken as string)) {
    console.log("coming here",refreshToken);
    try {
      const tokenData = await getNewTokens(refreshToken);
      console.log("tokenData",tokenData)

      if (tokenData) {
        const newReq = new NextRequest(req.url, {
          headers: new Headers({
            ...Object.fromEntries(req.headers),
            cookie: [
              `accessToken=${tokenData.accessToken}`,
              `refreshToken=${tokenData.refreshToken}`,
              `sessionToken=${tokenData.sessionToken}`,
            ].join("; "),
          }),
        });

        const user = await getUserInfoMiddleware(newReq);
        let targetResponse: NextResponse;

        if (user?.emailVerified === false && pathname !== '/verify-email') {
          const verifyEmailUrl = new URL("/verify-email", req.url);
          verifyEmailUrl.searchParams.set("email", user?.email);
          targetResponse = NextResponse.redirect(verifyEmailUrl);
        }
        else if (user?.emailVerified && pathname === '/verify-email') {
          targetResponse = NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
        }
        else if (user?.needPasswordChanges && pathname !== '/reset-password') {
          // ✅ email সহ redirect
          targetResponse = NextResponse.redirect(buildResetPasswordURL(req.url, user.email));
        }
        else if (!user?.needPasswordChanges && pathname === '/reset-password') {
          targetResponse = NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
        }
        else {
          targetResponse = NextResponse.next({
            request: { headers: new Headers(req.headers) }
          });
        }

        setTokenCookies(targetResponse, tokenData);
        return targetResponse;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }





  // ============================================
  // Rule-4: Token আছে এবং valid
  // ============================================
  if (accessToken && verifyAccessToken && !isWillExpiredSoon(accessToken)) {
    const user = await getUserInfoMiddleware(req);

    if (user) {
      // console.log("user", user);

      if (user.emailVerified === false) {
        if (pathname !== "/verify-email") {
          const verifyEmailUrl = new URL("/verify-email", req.url);
          verifyEmailUrl.searchParams.set("email", user?.email);
          return NextResponse.redirect(verifyEmailUrl);
        }
        return NextResponse.next();
      }

      if (user.emailVerified && pathname === "/verify-email") {
        return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
      }

      if (user.needPasswordChanges && pathname !== '/reset-password') {
        // ✅ email সহ redirect — এটাই আগে loop করাচ্ছিল!
        return NextResponse.redirect(buildResetPasswordURL(req.url, user.email));
      }

      if (!user.needPasswordChanges && pathname === '/reset-password') {
        return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
      }
    }
  }

  // ============================================
  // Rule-5 & 6: Route owner check
  // ============================================
  const routeowner = await routeOwner(pathname as string);

  if (routeowner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginURL = new URL('/login', req.url);
    loginURL.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginURL);
  }

  if (routeowner === 'COMMON') {
    return NextResponse.next();
  }

  if (routeowner !== userRole) {
    return NextResponse.redirect(new URL(defaultRoute(userRole as string), req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};