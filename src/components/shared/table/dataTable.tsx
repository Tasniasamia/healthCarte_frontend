"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import DataTablePagination from "./dataTablePagination";
import DataTableSearch from "./dataTableSearch";
import DataTableFilters, {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "./dataTableFilter";

interface actionsType<T> {
  onEdit?: (payload: T) => void;
  onView?: (payload: T) => void;
  onDelete?: (payload: T) => void;
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface ICustomTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: actionsType<TData>;
  loading: boolean;
  emptyMessage?: string;
  sorting?: {
    state: SortingState; 
    onSortingChange: (state: SortingState) => void;
  };
  pagination?: {
      state: PaginationState;
      onPaginationChange: (state: PaginationState) => void;
    };
  search?: {
      initialValue?: string;
      placeholder?: string;
      debounceMs?: number;
      onDebouncedChange: (value: string) => void;
    };
  filters?: {
      configs: DataTableFilterConfig[];
      values: DataTableFilterValues;
      onFilterChange: (filterId: string, value: DataTableFilterValue | undefined) => void;
      onClearAll?: () => void;
    };
   meta?: PaginationMeta;

}

export default function DataTable<TData>({
  data,
  columns,
  actions,
  loading,
  emptyMessage,
  sorting,
  pagination,
  search,
  filters,
  meta
}: ICustomTableProps<TData>) {
  const actionColumn: ColumnDef<TData> = {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: (info): any => (
      <div className="flex gap-2">
        {actions?.onEdit && (
          <button
            className="cursor-pointer"
            onClick={() => actions.onEdit?.(info.row.original)}
          >
            Edit
          </button>
        )}
        {actions?.onView && (
          <button
            className="cursor-pointer"
            onClick={() => actions.onView?.(info.row.original)}
          >
            View
          </button>
        )}
        {actions?.onDelete && (
          <button
            className="cursor-pointer"
            onClick={() => actions.onDelete?.(info.row.original)}
          >
            Delete
          </button>
        )}
      </div>
    ),
  };

  const newColumns = actions ? [...columns, actionColumn] : columns;
  // const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns: newColumns,
    getCoreRowModel: getCoreRowModel(),
 getSortedRowModel:getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      manualSorting: !!sorting,
      manualPagination: !!pagination,
      pageCount: pagination ? Math.max(meta?.totalPages ?? 0, 0) : undefined,
      state : {
        ...(sorting ? { sorting : sorting.state } : {}),
        ...(pagination ? { pagination: pagination.state } : {}),
      },
      onSortingChange : sorting ? 
        (updater) => {
          const currentSortingState = sorting.state;

          const nextSortingState = typeof updater === "function" ? updater(currentSortingState) : updater;

          sorting.onSortingChange(nextSortingState);
        }
      : undefined,
      onPaginationChange: pagination
        ? (updater) => {
            const currentPaginationState = pagination.state;
            const nextPaginationState =
              typeof updater === "function"
                ? updater(currentPaginationState)
                : updater;

            pagination.onPaginationChange(nextPaginationState);
          }
        : undefined,
  });



  return (
    <div className="relative w-full">
       <div className="mb-4 flex flex-wrap items-start gap-3">
            {search && (
              <DataTableSearch
                key={search.initialValue ?? ""}
                initialValue={search.initialValue}
                placeholder={search.placeholder}
                debounceMs={search.debounceMs}
                onDebouncedChange={search.onDebouncedChange}
                isLoading={loading}
              />
            )}
                {filters && (
              <DataTableFilters
                filters={filters.configs}
                values={filters.values}
                onFilterChange={filters.onFilterChange}
                onClearAll={filters.onClearAll}
                isLoading={loading}
              />
            )}

            </div>

            
      {loading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.placeholderId ? null : header.column.getCanSort() ? (
                      <Button
                        variant={"ghost"}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer"
                      >
                        {flexRender( header.column.columnDef.header,
                        header.getContext() )}
                       {
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ) : <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                          }
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )
                  }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={newColumns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage || "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
           {pagination && (
            <DataTablePagination
              table={table}
              totalPages={meta?.totalPages}
              totalRows={meta?.total}
              isLoading={loading}
            />
          )}
      </div>
    </div>
  );
}
