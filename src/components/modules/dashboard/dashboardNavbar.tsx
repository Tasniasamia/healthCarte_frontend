import React from 'react';
import DashboardNavbarContent from './dashboardNavbarContent';
import { getUserInfo } from '@/services/auth.service';
// import { getNavItemsByRole } from '@/lib/navItem';
import { defaultRoute } from '@/lib/auth.utils';

const DashboardNavbar =async () => {
    const userInfo=await getUserInfo();
    console.log("userInfo",userInfo);
    const dashboardHome=defaultRoute(userInfo?.role as string);
    return (
        <div>
            <DashboardNavbarContent userInfo={userInfo} role={userInfo?.role} dashboardHome={dashboardHome} />
        </div>
    );
};

export default DashboardNavbar;