import { ColumnDef } from "@tanstack/react-table";
import { IDoctorSchedule } from "@/types/doctorSchedule.types";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";

export const myScheduleColumn: ColumnDef<IDoctorSchedule>[] = [
  {
    id: "startDateTime",
    accessorKey: "schedule.startDateTime",
    header: "Start Time",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {dayjs(row.original.schedule?.startDateTime).format("DD/MM/YYYY")}
        </span>
        <span className="text-xs text-muted-foreground">
          {dayjs(row.original.schedule?.startDateTime).format("hh:mm A")}
        </span>
      </div>
    ),
  },
  {
    id: "endDateTime",
    accessorKey: "schedule.endDateTime",
    header: "End Time",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {dayjs(row.original.schedule?.endDateTime).format("DD/MM/YYYY")}
        </span>
        <span className="text-xs text-muted-foreground">
          {dayjs(row.original.schedule?.endDateTime).format("hh:mm A")}
        </span>
      </div>
    ),
  },
  {
    id: "isBooked",
    accessorKey: "isBooked",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant={row.original.isBooked ? "default" : "secondary"}>
        {row.original.isBooked ? "Booked" : "Available"}
      </Badge>
    ),
  },
];