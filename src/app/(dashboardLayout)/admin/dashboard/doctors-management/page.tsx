// src/app/(commonLayout)/consulation/page.tsx

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query'
import { getAllDoctors, getAllSpecialties } from '@/services/doctor.service'
import DoctorTable from '@/components/modules/admin/doctorManagement/doctorTable'
  
 export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchQueries = await searchParams; 
    console.log("searchQueries",searchQueries);

  const urlQuerires=Object.keys(searchQueries)?.map((key:string)=>{
    if(searchQueries[key] === undefined) return "";
    if(Array.isArray(searchQueries[key])){  
   return searchQueries[key]?.map((v)=>{return `${key}=${v}`}).join("&");
  }
  return `${key}=${searchQueries[key]}`;
  }).join("&");

  console.log("urlQuerires",urlQuerires);
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery({
      queryKey: ['doctors',urlQuerires],
      queryFn: ()=>getAllDoctors(urlQuerires),
    })
    await queryClient.prefetchQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <DoctorTable urlQuerires={urlQuerires} searchQueries={searchQueries as Record<string, string>}/>
      </HydrationBoundary>
    )
  }
