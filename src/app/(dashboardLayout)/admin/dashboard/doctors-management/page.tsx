// src/app/(commonLayout)/consulation/page.tsx

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query'
import { getAllDoctors } from '@/services/doctor.service'
import DoctorTable from '@/components/modules/admin/doctorManagement/doctorTable'
  
  export default async function DoctorManagementPage() {
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery({
      queryKey: ['doctors'],
      queryFn: ()=>getAllDoctors(),
    })
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DoctorTable />
      </HydrationBoundary>
    )
  }