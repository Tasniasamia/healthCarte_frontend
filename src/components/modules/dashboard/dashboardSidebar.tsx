import React from 'react';
import DashboardSidebarContent from './dashboardSidebarContent';
import { getUserInfo } from '@/services/auth.service';
import { getNavItemsByRole } from '@/lib/navItem';
import { defaultRoute } from '@/lib/auth.utils';

const DashboardSidebar =async () => {
    const userInfo=await getUserInfo();
    console.log("userInfo",userInfo);
    const dashboardHome=defaultRoute(userInfo?.role as string);
    return (
        <div>
            <DashboardSidebarContent userInfo={userInfo} role={userInfo?.role as string} dashboardHome={dashboardHome} />
        </div>
    );
};

export default DashboardSidebar;