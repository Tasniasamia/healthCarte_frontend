import { ISchedule } from "@/types/schedule.types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const scheduleColumn: ColumnDef<ISchedule>[] = [
  {
    id: "startDateTime",
    accessorKey: "startDateTime",
    header: "Start Time",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {dayjs(row.original.startDateTime).format("DD/MM/YYYY")}
        </span>
        <span className="text-xs text-muted-foreground">
          {dayjs(row.original.startDateTime).format("hh:mm A")}
        </span>
      </div>
    ),
  },
  {
    id: "endDateTime",
    accessorKey: "endDateTime",
    header: "End Time",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {dayjs(row.original.endDateTime).format("DD/MM/YYYY")}
        </span>
        <span className="text-xs text-muted-foreground">
          {dayjs(row.original.endDateTime).format("hh:mm A")}
        </span>
      </div>
    ),
  },
  {
    id: "appointments",
    accessorKey: "appointments",
    header: "Appointments",
    enableSorting: false,
    cell: ({ row }) => {
      const count = row.original.appointments?.length ?? 0;
      return (
        <span className={`text-sm font-medium ${count > 0 ? "text-primary" : "text-muted-foreground"}`}>
          {count} appointment{count !== 1 ? "s" : ""}
        </span>
      );
    },
  },
  {
    id: "doctorSchedules",
    accessorKey: "doctorSchedules",
    header: "Doctors",
    enableSorting: false,
    cell: ({ row }) => {
      const count = row.original.doctorSchedules?.length ?? 0;
      return (
        <span className="text-sm text-muted-foreground">
          {count} doctor{count !== 1 ? "s" : ""}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {dayjs(row.original.createdAt).format("DD/MM/YYYY")}
      </span>
    ),
  },
];