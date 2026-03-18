import { Badge } from "@/components/ui/badge"
import { IDoctor } from "@/types/doctor.types"
import { IDoctorSpecialty } from "@/types/speciality.types"
import { ColumnDef } from "@tanstack/react-table"
import { Star } from "lucide-react"
import Image from "next/image"
import StatusBadgeCell from "./cell/statusBadgeCell"
import dayjs from "dayjs"
import "dayjs/locale/es"

dayjs.locale("es")
export const doctorColumn: ColumnDef<IDoctor>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={row.original.profilePhoto || ""}
            alt={row.original.name}
            width={40}
            height={40}
          />
          <h2>{row.original.name}</h2>
        </div>
      )
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
        return (
          <div>{row.original.email}</div>
        )
      },  
    
    },
    {
        id: "specialties",
        accessorKey: "specialities",
        header: "Specialties",
        enableSorting:false,
        cell: ({ row }) => {
          const specialties = row.original.specialities
      
          if (!specialties || specialties.length === 0) {
            return (
              <span className="text-xs text-muted-foreground">
                No Specialties
              </span>
            )
          }
      
          return (
            <div className="flex flex-wrap gap-1">
              {specialties.map((item, index) => {
                const title = item.specialty?.title || "N/A"
      
                return (
                  <Badge variant="secondary" key={index}>
                    {title}
                  </Badge>
                )
              })}
            </div>
          )
        },
      },
      {
        id: "contactNumber",
        accessorKey: "contactNumber",
        header: "Contact Number",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm">{row.original?.contactNumber || "N/A"}</span>
          </div>
        ),
      },
      {
        id: "experience",
        accessorKey: "experience",
        header: "Experience",
        cell: ({ row }) => {
          return (
            <span className="text-sm font-medium">
              {row.original.experience ?? 0} years
            </span>
          );
        },
      },
      {
        id: "appointmentFee",
        accessorKey: "appointmentFee",
        header: "Fee",
        cell: ({ row }) => {
          return (
            <span className="text-sm font-semibold text-green-600">
              ${row.original?.appointmentFee.toFixed(2) ?? "N/A"}
            </span>
          );
        },
      },
      {
        id: "averageRating",
        accessorKey: "averageRating",
        header: "Rating",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {row.original.avaerageRating?.toFixed(1) || "0.0"}
              </span>
            </div>
          );
        },
      },
      {
        id: "gender",
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
          return (
            <span className="text-sm capitalize">
              {row.original.gender.toLowerCase()}
            </span>
          );
        },
      },
      {
        id: "status",
        accessorKey: "user.status",
        header: "Status",
        cell: ({ row }) => {
          return (
            <StatusBadgeCell status={row.original.user.status} />
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Joined On",
        cell: ({ row }) => {
          return (
            <div>{dayjs(row.original.createdAt).format('DD/MM/YYYY')}</div>
          );
        },
      },
]