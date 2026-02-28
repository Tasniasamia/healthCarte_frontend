"use client"
import { getDoctorData } from "@/app/(commonLayout)/consulation/_action"
import { useQuery } from "@tanstack/react-query"

export function Posts() {
    const { data, isLoading, isError } = useQuery<[]>({
      queryKey: ['doctors'],
      queryFn: getDoctorData,
    })
  
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>কিছু একটা সমস্যা হয়েছে</p>
  console.log("data",data)
    return (
      <ul>
        {/* {data?.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} — {doctor.specialty}
          </li>
        ))} */}
      </ul>
    )
  }