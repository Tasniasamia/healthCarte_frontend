"use client";

import { getAllDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./doctorCard";
import SearchInput from "@/components/shared/table/searchInput";
import FilterPanel, { FilterFieldConfig } from "@/components/shared/table/filterPanel";
import Pagination from "@/components/shared/table/tablePagination";
import { Loader2 } from "lucide-react";

const doctorFilters: FilterFieldConfig[] = [
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

interface IDoctorListProps {
  urlQuerires: string;
  searchQueries: Record<string, string>;
}

export default function DoctorList({ urlQuerires, searchQueries }: IDoctorListProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["public-doctors", searchQueries],
    queryFn: () => getAllDoctors(urlQuerires),
  });

  const doctors: IDoctor[] = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      {/* ✅ toolbar — search + filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchInput placeholder="Search doctors..." />
        <FilterPanel filters={doctorFilters} />
      </div>

      {/* loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* empty */}
      {!isLoading && doctors.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No doctors found
        </div>
      )}

      {/* ✅ card grid */}
      {!isLoading && doctors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

      {/* ✅ pagination */}
      {meta && (
        <Pagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          totalPages={meta.totalPages}
        />
      )}
    </div>
  );
}