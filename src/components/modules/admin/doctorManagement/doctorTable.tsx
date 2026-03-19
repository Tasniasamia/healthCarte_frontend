// "use client";

// import { getAllDoctors } from "@/services/doctor.service";
// import { IDoctor } from "@/types/doctor.types";
// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { doctorColumn } from "./doctorColumn";
// import DataTable from "@/components/shared/table/dataTable";
// import FilterPanel, { FilterFieldConfig } from "@/components/shared/table/filterPanel";
// import AddDoctorModal from "./addDoctorModal";

// // ✅ doctor table র filter config
// const doctorFilters: FilterFieldConfig[] = [
//   {
//     type: "select",
//     key: "user.status",
//     label: "User Status",
//     placeholder: "All statuses",
//     options: [
//       { label: "Active", value: "ACTIVE" },
//       { label: "Blocked", value: "BLOCKED" },
//       { label: "Deleted", value: "DELETED" },
//     ],
//   },
//   {
//     type: "select",
//     key: "gender",
//     label: "Gender",
//     placeholder: "All genders",
//     options: [
//       { label: "Male", value: "MALE" },
//       { label: "Female", value: "FEMALE" },
//       { label: "Other", value: "OTHER" },
//     ],
//   },
//   {
//     type: "range",
//     label: "Appointment Fee",
//     gtKey: "appointmentFee[gt]",
//     ltKey: "appointmentFee[lt]",
//     placeholder: { gt: "Min", lt: "Max" },
//   },
// ];

// const DoctorTable = ({
//   urlQuerires,
//   searchQueries,
// }: {
//   urlQuerires: string;
//   searchQueries: Record<string, string>;
// }) => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["doctors", searchQueries],
//     queryFn: () => getAllDoctors(urlQuerires),
//   });

//   const handleEdit = (doctor: IDoctor) => console.log(doctor);
//   const handleView = (doctor: IDoctor) => console.log(doctor);
//   const handleDelete = (doctor: IDoctor) => console.log(doctor);

//   return (
//     <div>
//       <DataTable
//         data={data?.data ?? []}
//         columns={doctorColumn as ColumnDef<IDoctor>[]}
//         loading={isLoading}
//         actions={{ onEdit: handleEdit, onView: handleView, onDelete: handleDelete }}
//         emptyMessage="No doctors found"
//         meta={data?.meta}
//         sortBy={searchQueries?.sortBy}
//         sortOrder={searchQueries?.sortOrder as "asc" | "desc"}
//         searchable={true}
//         searchPlaceholder="Search doctors..."
//         filterPanel={<FilterPanel filters={doctorFilters} />} // ✅
//                 toolbarAction={<AddDoctorModal />} // ✅ Add Doctor button

//       />
//     </div>
//   );
// };

// export default DoctorTable;


// "use client";

// import { deleteDoctor, getAllDoctors } from "@/services/doctor.service";
// import { IDoctor } from "@/types/doctor.types";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { doctorColumn } from "./doctorColumn";
// import DataTable from "@/components/shared/table/dataTable";
// import FilterPanel, { FilterFieldConfig } from "@/components/shared/table/filterPanel";
// import AddDoctorModal from "./addDoctorModal";
// import EditDoctorModal from "./editDoctorModal";
// import { toast } from "sonner";

// const doctorFilters: FilterFieldConfig[] = [
//   {
//     type: "select",
//     key: "user.status",
//     label: "User Status",
//     placeholder: "All statuses",
//     options: [
//       { label: "Active", value: "ACTIVE" },
//       { label: "Blocked", value: "BLOCKED" },
//       { label: "Deleted", value: "DELETED" },
//     ],
//   },
//   {
//     type: "select",
//     key: "gender",
//     label: "Gender",
//     placeholder: "All genders",
//     options: [
//       { label: "Male", value: "MALE" },
//       { label: "Female", value: "FEMALE" },
//       { label: "Other", value: "OTHER" },
//     ],
//   },
//   {
//     type: "range",
//     label: "Appointment Fee",
//     gtKey: "appointmentFee[gt]",
//     ltKey: "appointmentFee[lt]",
//     placeholder: { gt: "Min", lt: "Max" },
//   },
// ];


//   const queryClient = useQueryClient();


// const DoctorTable = ({
//   urlQuerires,
//   searchQueries,
// }: {
//   urlQuerires: string;
//   searchQueries: Record<string, string>;
// }) => {


//   const { data, isLoading } = useQuery({
//     queryKey: ["doctors", searchQueries],
//     queryFn: () => getAllDoctors(urlQuerires),
//   });





//   const { mutate: handleDelete } = useMutation({
//     mutationFn: (id: string) => deleteDoctor(id),
//     onSuccess: () => {
//       toast.success("Doctor deleted successfully");
//       queryClient.invalidateQueries({ queryKey: ["doctors"] });
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to delete doctor");
//     },
//   });


//   // ✅ edit modal state
//   const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);


//   // const handleDelete = (doctor: IDoctor) => {

//   // };

//   return (
//     <div>
//       <DataTable
//         data={data?.data ?? []}
//         columns={doctorColumn as ColumnDef<IDoctor>[]}
//         loading={isLoading}
//     actions={{
//           onEdit: (doctor) => setEditingDoctor(doctor),
//           onView: (doctor) => console.log(doctor),
//           onDelete: (doctor) => handleDelete(doctor.id), // ✅ সরাসরি id পাঠাও
//         }}        emptyMessage="No doctors found"
//         meta={data?.meta}
//         sortBy={searchQueries?.sortBy}
//         sortOrder={searchQueries?.sortOrder as "asc" | "desc"}
//         searchable={true}
//         searchPlaceholder="Search doctors..."
//         filterPanel={<FilterPanel filters={doctorFilters} />}
//         toolbarAction={<AddDoctorModal />}
//       />

//       {/* ✅ Edit Modal — editingDoctor থাকলে open হবে */}
//       {editingDoctor && (
//         <EditDoctorModal
//           doctor={editingDoctor}
//           open={!!editingDoctor}
//           onClose={() => setEditingDoctor(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default DoctorTable;



"use client";

import { deleteDoctor, getAllDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { doctorColumn } from "./doctorColumn";
import DataTable from "@/components/shared/table/dataTable";
import FilterPanel, { FilterFieldConfig } from "@/components/shared/table/filterPanel";
import AddDoctorModal from "./addDoctorModal";
import EditDoctorModal from "./editDoctorModal";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["doctors", searchQueries],
    queryFn: () => getAllDoctors(urlQuerires),
  });

  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);

  // ✅ delete mutation
  const { mutate: handleDelete } = useMutation({
    mutationFn: (id: string) => deleteDoctor(id),
    onSuccess: () => {
      toast.success("Doctor deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete doctor");
    },
  });

  return (
    <div>
      <DataTable
        data={data?.data ?? []}
        columns={doctorColumn as ColumnDef<IDoctor>[]}
        loading={isLoading}
        actions={{
          onEdit: (doctor) => setEditingDoctor(doctor),
          onView: (doctor) => console.log(doctor),
          onDelete: (doctor) => handleDelete(doctor.id), // ✅ সরাসরি id পাঠাও
        }}
        emptyMessage="No doctors found"
        meta={data?.meta}
        sortBy={searchQueries?.sortBy}
        sortOrder={searchQueries?.sortOrder as "asc" | "desc"}
        searchable={true}
        searchPlaceholder="Search doctors..."
        filterPanel={<FilterPanel filters={doctorFilters} />}
        toolbarAction={<AddDoctorModal />}
      />

      {editingDoctor && (
        <EditDoctorModal
          doctor={editingDoctor}
          open={!!editingDoctor}
          onClose={() => setEditingDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorTable;