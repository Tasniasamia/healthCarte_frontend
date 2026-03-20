"use client";

import { deleteSchedule, getAllSchedules } from "@/services/Schedule.service";
import { ISchedule } from "@/types/schedule.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { scheduleColumn } from "./Schedulecolumn ";
import DataTable from "@/components/shared/table/dataTable";
import AddScheduleModal from "./Addschedulemodal";
import EditScheduleModal from "./Editschedulemodal";
import { toast } from "sonner";

const ScheduleTable = ({
  urlQuerires,
  searchQueries,
}: {
  urlQuerires: string;
  searchQueries: Record<string, string>;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["schedules", searchQueries],
    queryFn: () => getAllSchedules(urlQuerires),
  });

  const [editingSchedule, setEditingSchedule] = useState<ISchedule | null>(null);

  const { mutate: handleDelete } = useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      toast.success("Schedule deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete schedule");
    },
  });

  return (
    <div>
      <DataTable
        data={data?.data ?? []}
        columns={scheduleColumn as ColumnDef<ISchedule>[]}
        loading={isLoading}
        actions={{
          onEdit: (schedule) => setEditingSchedule(schedule),
          onDelete: (schedule) => handleDelete(schedule.id),
        }}
        emptyMessage="No schedules found"
        meta={data?.meta}
        sortBy={searchQueries?.sortBy}
        sortOrder={searchQueries?.sortOrder as "asc" | "desc"}
        searchable={true}
        searchPlaceholder="Search schedules..."
        toolbarAction={<AddScheduleModal />}
      />

      {editingSchedule && (
        <EditScheduleModal
          schedule={editingSchedule}
          open={!!editingSchedule}
          onClose={() => setEditingSchedule(null)}
        />
      )}
    </div>
  );
};

export default ScheduleTable;