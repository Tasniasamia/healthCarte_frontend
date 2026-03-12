// src/app/(commonLayout)/consulation/page.tsx

import { getDashboardData } from '@/services/dashboard.service'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query'
import AdminDashboardComponent from '@/components/modules/dashboard/adminDashboardComponent';
  
  export default async function AdminDashboardPage() {
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery({
      queryKey: ['admin-dashboard-stats'],
      queryFn: ()=>getDashboardData(),
      staleTime: 1000 * 5,
      gcTime: 1000 * 5*60
    })

    // const data = await queryClient.getQueryData(['admin-dashboard-stats']);
    // console.log("data",data);
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
       <AdminDashboardComponent/>
      </HydrationBoundary>
    )
  }