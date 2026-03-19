"use client";

import { getAllDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { doctorColumn } from "./doctorColumn";
import DataTable from "@/components/shared/table/dataTable";

const DoctorTable = ({
  urlQuerires,
  searchQueries,
}: {
  urlQuerires: string;
  searchQueries: Record<string, string>;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["doctors", searchQueries],
    queryFn: () => getAllDoctors(urlQuerires),
  });

  const handleEdit = (doctor: IDoctor) => console.log(doctor);
  const handleView = (doctor: IDoctor) => console.log(doctor);
  const handleDelete = (doctor: IDoctor) => console.log(doctor);

  return (
    <div>
      <DataTable
        data={data?.data ?? []}
        columns={doctorColumn as ColumnDef<IDoctor>[]}
        loading={isLoading}
        actions={{ onEdit: handleEdit, onView: handleView, onDelete: handleDelete }}
        emptyMessage="No doctors found"
        meta={data?.meta}
        sortBy={searchQueries?.sortBy}
        sortOrder={searchQueries?.sortOrder as "asc" | "desc"}
        searchable={true}                          // ✅ search চালু
        searchPlaceholder="Search doctors..."      // ✅ placeholder
      />
    </div>
  );
};

export default DoctorTable;