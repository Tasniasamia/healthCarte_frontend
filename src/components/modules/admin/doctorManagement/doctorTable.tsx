"use client"
import CustomTable from '@/components/shared/table/customTable'
import { getAllDoctors } from '@/services/doctor.service'
import { IDoctor } from '@/types/doctor.types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { doctorColumn } from './doctorColumn'
import DataTable from '@/components/shared/table/dataTable'

const DoctorTable = () => {
    const {data, isLoading, isError} = useQuery({
      queryKey:['doctors'],
      queryFn:() => getAllDoctors(),
    })

    // if(isLoading) return <div>Loading...</div>
    // if(isError) return <div>Error...</div>

    // const doctorColumns: ColumnDef<IDoctor>[] = [
    //   {
    //     id: "id",
    //     accessorKey: "id",
    //     header: "ID",
    //     cell: (info) => info.row.original.id,
    //   },
    //   {
    //     id: "name",
    //     accessorKey: "name",
    //     header: "Name",
    //     cell: (info) => info.row.original.name,
    //   },
    //   {
    //     id: "email",
    //     accessorKey: "email",
    //     header: "Email",
    //     cell: (info) => info.row.original.email,
    //   },
    //   {
    //     id: "contactNumber",
    //     accessorKey: "contactNumber",
    //     header: "Contact Number",
    //     cell: (info) => info.row.original.contactNumber,
    //   },
    //   {
    //     id: "address",
    //     accessorKey: "address",
    //     header: "Address",
    //     cell: (info) => info.row.original.address || "N/A",
    //   },
    //   { id: "registrationNumber",
    //     accessorKey: "registrationNumber",
    //     header: "Registration Number",
    //     cell: (info) => info.row.original.registrationNumber,
    //   },
    //   {
    //     id: "experience",
    //     accessorKey: "experience",
    //     header: "Experience",
    //     cell: (info) => `${info.row.original.experience} years`,
    //   },
    // ]
const handleEdit = (doctor: IDoctor) => {
  console.log(doctor)
}
const handleView = (doctor: IDoctor) => {
  console.log(doctor)
}
const handleDelete = (doctor: IDoctor) => {
  console.log(doctor)
}
const actions = {
  onEdit: handleEdit,
  onView: handleView,
  onDelete: handleDelete,
}
    return (
      <div className=''>
        {/* <CustomTable<IDoctor> 
          data={data?.data ?? []} 
          columns={doctorColumn as ColumnDef<IDoctor>[]}
        /> */}
        <DataTable
          data={data?.data ?? []}
          columns={doctorColumn as ColumnDef<IDoctor>[]}
          loading={isLoading}
          actions={actions}
          emptyMessage="No doctors found"
        />
      </div>
    )
} 

export default DoctorTable