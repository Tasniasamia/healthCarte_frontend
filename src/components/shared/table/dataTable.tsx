"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

interface actionsType<T> {
  onEdit?: (payload: T) => void;
  onView?: (payload: T) => void;
  onDelete?: (payload: T) => void;
}

interface ICustomTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: actionsType<TData>;
  loading: boolean;
  emptyMessage?: string;
}

export default function DataTable<TData>({
  data,
  columns,
  actions,
  loading,
  emptyMessage,
}: ICustomTableProps<TData>) {

  const actionColumn: ColumnDef<TData> = {
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex gap-2">
        {actions?.onEdit && (
          <button className="cursor-pointer" onClick={() => actions.onEdit?.(info.row.original)}>
            Edit
          </button>
        )}
        {actions?.onView && (
          <button className="cursor-pointer" onClick={() => actions.onView?.(info.row.original)}>
            View
          </button>
        )}
        {actions?.onDelete && (
          <button className="cursor-pointer" onClick={() => actions.onDelete?.(info.row.original)}>
            Delete
          </button>
        )}
      </div>
    ),
  };

  const newColumns = actions ? [...columns, actionColumn] : columns;

  const table = useReactTable({
    data,
    columns: newColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative w-full">
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                        cell.getContext()
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
      </div>
    </div>
  );
}