"use client"
import CustomTable from '@/components/shared/table/customTable'
import { getAllDoctors } from '@/services/doctor.service'
import { IDoctor } from '@/types/doctor.types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'

const DoctorTable = () => {
    const {data, isLoading, isError} = useQuery({
      queryKey:['doctors'],
      queryFn:() => getAllDoctors(),
    })

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error...</div>

    const doctorColumns: ColumnDef<IDoctor>[] = [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.row.original.id,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.row.original.name,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.row.original.email,
      },
      {
        accessorKey: "contactNumber",
        header: "Contact Number",
        cell: (info) => info.row.original.contactNumber,
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: (info) => info.row.original.address || "N/A",
      },
      {
        accessorKey: "registrationNumber",
        header: "Registration Number",
        cell: (info) => info.row.original.registrationNumber,
      },
      {
        accessorKey: "experience",
        header: "Experience",
        cell: (info) => `${info.row.original.experience} years`,
      },
    ]

    return (
      <div>
        <CustomTable<IDoctor> 
          data={data?.data ?? []} 
          columns={doctorColumns}
        />
      </div>
    )
} 

export default DoctorTable