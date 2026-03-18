// "use client";
// import CustomTable from "@/components/shared/table/customTable";
// import { getAllDoctors, getAllSpecialties } from "@/services/doctor.service";
// import { IDoctor } from "@/types/doctor.types";
// import { useQuery } from "@tanstack/react-query";
// import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react";
// import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
// import { doctorColumn } from "./doctorColumn";
// import DataTable from "@/components/shared/table/dataTable";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { DataTableFilterConfig } from "@/components/shared/table/dataTableFilter";
// import { ISpecialty } from "@/types/speciality.types";
// import { PaginationMeta } from "@/types/api.types";

// const DoctorTable = ({
//   urlQuerires,
//   searchQueries,
// }: {
//   urlQuerires: string;
//   searchQueries: Record<string, string>;
// }) => {

// //sorting
//   const router = useRouter();
//   const pathName = usePathname();
//   const searchParams = useSearchParams();
//   const [isRouteRefreshPending, startRouteRefreshTransition] = useTransition();

//   const sortingstate = useMemo<SortingState>(() => {
//     const sortOrder = searchParams.get("sortOrder");
//     const sortBy = searchParams.get("sortBy");
//     if (!sortBy || !sortOrder) return [];
//     return [{ id: sortBy, desc: sortOrder === "desc" }];
//   }, [searchParams]);

//   const handleSortingChange = (state: SortingState) => {
//     const params = new URLSearchParams(searchParams.toString());
//     const nextSorting = state[0];
//     if (nextSorting) {
//       params.set("sortBy", nextSorting.id);
//       params.set("sortOrder", nextSorting.desc ? "desc" : "asc");
//     } else {
//       params.delete("sortBy");
//       params.delete("sortOrder");
//     }
//     params.set("page", "1");
//     const nextQuery = params.toString();
//     router.push(nextQuery ? `${pathName}?${nextQuery}` : pathName);
//   };

// //refreshURL
//  interface UpdateParamsOptions {
//   resetPage?: boolean;
// }

//  type UpdateParamsFn = (
//   updater: (params: URLSearchParams) => void,
//   options?: UpdateParamsOptions,
// ) => void;

// const updateUrlAndRefresh = useCallback((params: URLSearchParams) => {
//     const nextQuery = params.toString();
//     const currentQuery = window.location.search.replace(/^\?/, "");

//     if (nextQuery === currentQuery) {
//       return;
//     }

//     const nextUrl = nextQuery ? `${pathName}?${nextQuery}` : pathName;

//     // Update URL immediately for optimistic UX, then refresh server components.
//     window.history.pushState(null, "", nextUrl);

//     startRouteRefreshTransition(() => {
//       router.refresh();
//     });
//   }, [pathName, router, startRouteRefreshTransition]);

// //params update
//   const updateParams = useCallback<UpdateParamsFn>((
//     updater: (params: URLSearchParams) => void,
//     options?: UpdateParamsOptions,
//   ) => {
//     const params = new URLSearchParams(window.location.search);

//     updater(params);

//     if (options?.resetPage) {
//       params.set("page", "1");
//       setOptimisticPaginationState((prevState) => ({
//         pageIndex: 0,
//         pageSize: prevState.pageSize,
//       }));
//     }

//     updateUrlAndRefresh(params);
//   }, [updateUrlAndRefresh]);

// //pagination
// //parsed number
// const parsePositiveInteger = (
//   value: string | null,
//   fallbackValue: number,
// ): number => {
//   if (!value) {
//     return fallbackValue;
//   }

//   const parsed = Number(value);
//   if (!Number.isInteger(parsed) || parsed <= 0) {
//     return fallbackValue;
//   }

//   return parsed;
// };

// //set searchParams
// const DEFAULT_PAGE = 1;
// const DEFAULT_LIMIT = 10;
// const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
// const APPOINTMENT_FEE_FILTER_KEY = "appointmentFee";
// const DOCTOR_FILTER_DEFINITIONS = [
//   serverManagedFilter.single("gender"),
//   serverManagedFilter.multi(SPECIALTIES_FILTER_KEY),
//   serverManagedFilter.range(APPOINTMENT_FEE_FILTER_KEY),
// ];

// const paginationStateFromUrl = useMemo<PaginationState>(() => {
//     const page = parsePositiveInteger(searchParams.get("page"), DEFAULT_PAGE);
//     const limit = parsePositiveInteger(searchParams.get("limit"), DEFAULT_LIMIT);

//     return {
//       pageIndex: page - 1,
//       pageSize: limit,
//     };
//   }, [DEFAULT_LIMIT, DEFAULT_PAGE, searchParams]);

// const [optimisticPaginationState, setOptimisticPaginationState] = useState<PaginationState>(paginationStateFromUrl);

//   useEffect(() => {
//     setOptimisticPaginationState(paginationStateFromUrl);
//   }, [paginationStateFromUrl]);

//   const handlePaginationChange = useCallback((state: PaginationState) => {
//     setOptimisticPaginationState(state);

//     updateParams((params) => {
//       params.set("page", String(state.pageIndex + 1));
//       params.set("limit", String(state.pageSize));
//     });
//   }, [updateParams]);

// //search

//  const searchTermFromUrl = useMemo(() => {
//     return searchParams.get("searchTerm") ?? "";
//   }, ["searchTerm", searchParams]);

//   const handleDebouncedSearchChange = useCallback((searchTerm: string) => {
//     const normalizedSearchTerm = searchTerm.trim();
//     const currentSearchTerm = searchParams.get("searchTerm") ?? "";

//     if (normalizedSearchTerm === currentSearchTerm) {
//       return;
//     }

//     updateParams((params) => {
//       if (normalizedSearchTerm) {
//         params.set("searchTerm", normalizedSearchTerm);
//         return;
//       }

//       params.delete("searchTerm");
//     }, { resetPage: true });
//   }, ["searchTerm", searchParams, updateParams]);

//   //fetch data

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["doctors", urlQuerires],
//     queryFn: () => getAllDoctors(urlQuerires),
//   });
//    const { data: specialtiesResponse, isLoading: isLoadingSpecialties } = useQuery({
//       queryKey: ["specialties"],
//       queryFn: getAllSpecialties,
//       staleTime: 1000 * 60 * 60 * 6,
//       gcTime: 1000 * 60 * 60 * 24,
//     });

// const handleEdit = (doctor: IDoctor) => {
//   console.log(doctor);
// };
// const handleView = (doctor: IDoctor) => {
//   console.log(doctor);
// };
// const handleDelete = (doctor: IDoctor) => {
//   console.log(doctor);
// };
// const [sorting, setSorting] = React.useState<SortingState>([]);

// const actions = {
//   onEdit: handleEdit,
//   onView: handleView,
//   onDelete: handleDelete,
// };

//     const doctors = data?.data ?? [];
//     const specialties = useMemo<ISpecialty[]>(() => {
//       return specialtiesResponse?.data ?? [];
//     }, [specialtiesResponse]);
//     const meta: PaginationMeta | undefined = data?.meta;

//      const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
//       return [
//         {
//           id: "gender",
//           label: "Gender",
//           type: "single-select",
//           options: [
//             { label: "Male", value: "MALE" },
//             { label: "Female", value: "FEMALE" },
//             { label: "Other", value: "OTHER" },
//           ],
//         },
//         {
//           id: SPECIALTIES_FILTER_KEY,
//           label: "Specialties",
//           type: "multi-select",
//           options: specialties.map((specialty) => ({
//             label: specialty.title,
//             value: specialty.title,
//           })),
//         },
//         {
//           id: "appointmentFee",
//           label: "Fee Range",
//           type: "range",
//         },
//       ];
//     }, [specialties]);

//    const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
//       return {
//         gender: filterValues.gender,
//         [SPECIALTIES_FILTER_KEY]: filterValues[SPECIALTIES_FILTER_KEY],
//         appointmentFee: filterValues[APPOINTMENT_FEE_FILTER_KEY],
//       };
//     }, [filterValues]);

//   return (
//     <div className="">
//       <DataTable
//         sorting={{
//           state: sortingstate,
//           onSortingChange: handleSortingChange,
//         }}
//           pagination={{
//             state: optimisticPaginationState,
//             onPaginationChange: handlePaginationChange,
//           }}
//             search={{
//             initialValue: searchTermFromUrl,
//             placeholder: "Search doctor by name, email...",
//             debounceMs: 700,
//             onDebouncedChange: handleDebouncedSearchChange,
//           }}
//         data={data?.data ?? []}
//         columns={doctorColumn as ColumnDef<IDoctor>[]}
//         loading={isLoading}
//         actions={actions}
//         emptyMessage="No doctors found"
//         meta={data?.meta}
//       />
//     </div>
//   );
// };

// export default DoctorTable;

"use client";

import DataTable from "@/components/shared/table/dataTable";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
} from "@/components/shared/table/dataTableFilter";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/userManagedDataTableFilter";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
// import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/userManagedDataTable";
import { getAllDoctors, getAllSpecialties } from "@/services/doctor.service";
import { PaginationMeta } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";
import { ISpecialty } from "@/types/speciality.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { doctorColumn } from "./doctorColumn";
// import CreateDoctorFormModal from "./CreateDoctorFormModal";
// import DeleteDoctorConfirmationDialog from "./DeleteDoctorConfirmationDialog";
// import EditDoctorFormModal from "./EditDoctorFormModal";
// import ViewDoctorProfileDialog from "./ViewDoctorProfileDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
const APPOINTMENT_FEE_FILTER_KEY = "appointmentFee";
const DOCTOR_FILTER_DEFINITIONS = [
  serverManagedFilter.single("gender"),
  serverManagedFilter.multi(SPECIALTIES_FILTER_KEY),
  serverManagedFilter.range(APPOINTMENT_FEE_FILTER_KEY),
];

const DoctorTable = ({
  urlQuerires,
  searchQueries,
}: {
  urlQuerires: string;
  searchQueries: Record<string, string>;
}) => {
  const searchParams = useSearchParams();
  // const {
  //   viewingItem,
  //   editingItem,
  //   deletingItem,
  //   isViewDialogOpen,
  //   isEditModalOpen,
  //   isDeleteDialogOpen,
  //   onViewOpenChange,
  //   onEditOpenChange,
  //   onDeleteOpenChange,
  //   tableActions,
  // } = useRowActionModalState<IDoctor>();

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || urlQuerires;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const { filterValues, handleFilterChange, clearAllFilters } =
    useServerManagedDataTableFilters({
      searchParams,
      definitions: DOCTOR_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: doctorDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["doctors", queryString],
    queryFn: () => getAllDoctors(queryString),
  });

  const { data: specialtiesResponse, isLoading: isLoadingSpecialties } =
    useQuery({
      queryKey: ["specialties"],
      queryFn: getAllSpecialties,
      staleTime: 1000 * 60 * 60 * 6,
      gcTime: 1000 * 60 * 60 * 24,
    });

  const doctors = doctorDataResponse?.data ?? [];
  const specialties = useMemo<ISpecialty[]>(() => {
    return specialtiesResponse?.data ?? [];
  }, [specialtiesResponse]);
  const meta: PaginationMeta | undefined = doctorDataResponse?.meta;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "gender",
        label: "Gender",
        type: "single-select",
        options: [
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
        ],
      },
      {
        id: SPECIALTIES_FILTER_KEY,
        label: "Specialties",
        type: "multi-select",
        options: specialties.map((specialty) => ({
          label: specialty.title,
          value: specialty.title,
        })),
      },
      {
        id: "appointmentFee",
        label: "Fee Range",
        type: "range",
      },
    ];
  }, [specialties]);

  const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
    return {
      gender: filterValues.gender,
      [SPECIALTIES_FILTER_KEY]: filterValues[SPECIALTIES_FILTER_KEY],
      appointmentFee: filterValues[APPOINTMENT_FEE_FILTER_KEY],
    };
  }, [filterValues]);

  const handleEdit = (doctor: IDoctor) => {
    console.log(doctor);
  };
  const handleView = (doctor: IDoctor) => {
    console.log(doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    console.log(doctor);
  };
  // const [sorting, setSorting] = React.useState<SortingState>([]);

  const actions = {
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete,
  };

  return (
    <>
      <DataTable
        data={doctors}
        columns={doctorColumn}
        loading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No doctors found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search doctor by name, email...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        meta={meta}
        actions={actions}
      />
    </>
  );
};
export default DoctorTable;
