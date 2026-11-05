import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/atoms/table";
import { Pagination, type PaginationProps } from "@/app/components/organisms/pagination";

export type Column<T> = { header: string; cell: (row: T) => ReactNode; className?: string };

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  empty,
  pagination,
  onRowClick,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  empty: string;
  pagination?: PaginationProps;
  onRowClick?: (row: T) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="border-b-0 bg-purple-50/60 hover:bg-purple-50/60">
            {columns.map((c) => (
              <TableHead key={c.header} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{c.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow
              key={rowKey(r)}
              onClick={onRowClick && (() => onRowClick(r))}
              className={`border-slate-100 transition-colors duration-150 even:bg-slate-50/30 hover:bg-purple-50/30 ${onRowClick ? "cursor-pointer" : ""}`}
            >
              {columns.map((c) => (
                <TableCell key={c.header} className={`px-4 py-3 ${c.className ?? ""}`}>{c.cell(r)}</TableCell>
              ))}
            </TableRow>
          ))}
          {!rows.length && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">{empty}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && <Pagination {...pagination} />}
    </div>
  );
}
