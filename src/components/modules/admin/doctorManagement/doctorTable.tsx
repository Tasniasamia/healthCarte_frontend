"use client";

import { getAllDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { doctorColumn } from "./doctorColumn";
import DataTable from "@/components/shared/table/dataTable";
import FilterPanel, { FilterFieldConfig } from "@/components/shared/table/filterPanel";

// ✅ doctor table র filter config
const doctorFilters: FilterFieldConfig[] = [
  {
    type: "select",
    key: "user.status",
    label: "User Status",
    placeholder: "All statuses",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Blocked", value: "BLOCKED" },
      { label: "Deleted", value: "DELETED" },
    ],
  },
  {
    type: "select",
    key: "gender",
    label: "Gender",
    placeholder: "All genders",
    options: [
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
      { label: "Other", value: "OTHER" },
    ],
  },
  {
    type: "range",
    label: "Appointment Fee",
    gtKey: "appointmentFee[gt]",
    ltKey: "appointmentFee[lt]",
    placeholder: { gt: "Min", lt: "Max" },
  },
];

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
        searchable={true}
        searchPlaceholder="Search doctors..."
        filterPanel={<FilterPanel filters={doctorFilters} />} // ✅
      />
    </div>
  );
};

export default DoctorTable;