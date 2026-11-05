import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../atoms/button";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const PAGE_SIZES = [10, 25, 50];
const pageBtn = "w-8 h-8 flex items-center justify-center text-xs rounded-lg transition-colors";
const navBtn =
  "px-3 h-8 flex items-center gap-1 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg border border-slate-200 transition-colors";

// 1 … 4 5 6 … 20
function pageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i && p - sorted[i - 1] > 1 ? ["…" as const, p] : [p]));
}

export function Pagination({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }: PaginationProps) {
  const from = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span>Showing {from} to {to} of {totalItems} results</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Items per page"
          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {PAGE_SIZES.map((s) => <option key={s} value={s}>{s} / page</option>)}
        </select>
      </div>
      <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
        <button type="button" className={navBtn} disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="size-3.5" /> Previous
        </button>
        {pageRange(currentPage, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="flex h-8 w-8 items-center justify-center text-xs text-slate-400">…</span>
          ) : (
            <Button
              key={p}
              type="button"
              aria-current={p === currentPage ? "page" : undefined}
              onClick={() => onPageChange(p)}
              className={`${pageBtn} ${p === currentPage ? "font-semibold text-white" : "bg-white font-medium text-slate-600 hover:bg-slate-100"}`}
            >
              {p}
            </Button>
          ),
        )}
        <button type="button" className={navBtn} disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
          Next <ChevronRight className="size-3.5" />
        </button>
      </nav>
    </div>
  );
}
