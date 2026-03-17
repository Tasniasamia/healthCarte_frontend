"use client"
import CustomTable from '@/components/shared/table/customTable'
import { getAllDoctors } from '@/services/doctor.service'
import { IDoctor } from '@/types/doctor.types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { doctorColumn } from './doctorColumn'
import DataTable from '@/components/shared/table/dataTable'

const DoctorTable = ({urlQuerires,searchQueries}:{urlQuerires:string,searchQueries:Record<string,string>}) => {
    const {data, isLoading, isError} = useQuery({
      queryKey:['doctors',searchQueries],
      queryFn:() => getAllDoctors(urlQuerires),
    })

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