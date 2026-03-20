"use client";

import { deleteDoctorSchedule, getMySchedules } from "@/services/doctorSchedule.service";
import { IDoctorSchedule } from "@/types/doctorSchedule.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { myScheduleColumn } from "./myschedulecolumn";
import DataTable from "@/components/shared/table/dataTable";
import ManageScheduleModal from "./manageschedulemodal";
import { toast } from "sonner";

const DoctorScheduleTable = ({
  searchQueries,
}: {
  searchQueries: Record<string, string>;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["mySchedules", searchQueries],
    queryFn: getMySchedules,
  });

  // ✅ delete mutation
  const { mutate: handleDelete } = useMutation({
    mutationFn: (scheduleId: string) => deleteDoctorSchedule(scheduleId),
    onSuccess: () => {
      toast.success("Schedule removed successfully");
      queryClient.invalidateQueries({ queryKey: ["mySchedules"] });
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || error?.message || "Failed to delete";
      toast.error(msg);
    },
  });

  return (
    <div>
      <DataTable
        data={data?.data ?? []}
        columns={myScheduleColumn as ColumnDef<IDoctorSchedule>[]}
        loading={isLoading}
        actions={{
          onDelete: (schedule) => handleDelete(schedule.scheduleId), // ✅
        }}
        emptyMessage="No schedules selected yet"
        meta={data?.meta}
        sortBy={searchQueries?.sortBy}
        sortOrder={searchQueries?.sortOrder as "asc" | "desc"}
        searchable={false}
        toolbarAction={<ManageScheduleModal />}
      />
    </div>
  );
};

export default DoctorScheduleTable;