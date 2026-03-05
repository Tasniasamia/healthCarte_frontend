export const authRoute=['/login','/register','/forget-password','/reset-password','/verify-email'];

export const isAuthRoute=(path:string)=>{
return    authRoute.some((route)=>route==path)
}

interface RouteConfigType{
    exact:string[];
    pattern:RegExp[];
}

export const patientRoute:RouteConfigType={
    exact:['/payment/:path*'],
    pattern:[/^\/dashboard(\/.*)?$/]
}
export const adminRoute: RouteConfigType = {
    exact: [],
    pattern: [
      /^\/admin\/dashboard(\/.*)?$/
    ],
  };
  
  export const doctorRoute: RouteConfigType = {
    exact: [],
    pattern: [
      /^\/doctor\/dashboard(\/.*)?$/
    ],
  };

export const commonProtectedRoute:RouteConfigType={
    exact:['/changePassword','/my-profile'],
    pattern:[]
}



export const isMatchRoute=(path:string,routeConfig:RouteConfigType)=>{

    if(routeConfig?.exact?.includes(path)){
     return true;
    }
 
    return routeConfig?.pattern?.some((route)=> route.test(path));
 }

  export const routeOwner=(path:string)=>{
    if(isMatchRoute(path,adminRoute)){
        return 'ADMIN';
    }
    else if(isMatchRoute(path,doctorRoute)){
        return 'DOCTOR';
    }
    else if(isMatchRoute(path,patientRoute)){
        return 'PATIENT';
    }
    else if(isMatchRoute(path,commonProtectedRoute)){
        return 'COMMON'
    }
    else{
        return null;
    }
  }

  export const defaultRoute=(role:string)=>{
    if((role==="ADMIN") || (role==="SUPER_ADMIN")){
        return '/admin/dashboard'
    }
    if(role==="DOCTOR"){
        return '/doctor/dashboard'

    }
    if(role==="PATIENT"){
        return '/dashboard'
    }

    return '/'
  }


  export const isValidRedirect=(path:string,role:string)=>{
   const routeowner= routeOwner(path);
   if(routeowner === role){
    return true;
   }
   return false;
  }

  