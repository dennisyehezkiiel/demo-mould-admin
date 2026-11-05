"use client";

import { useMemo, useState } from "react";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import { Column, DataTable } from "../organisms/data-table";
import Paths from "@/lib/route-paths";
import { useGetItemRequisitionList } from "@/lib/service/testing-requisition-service";
import { TestingRequisitionListResponse } from "@/app/types/response/testing-requisition-response";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

const Mono = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-slate-200/60 bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">{children}</span>
);

const DOT = ["bg-purple-100 text-purple-700", "bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"];

function Customer({ name }: { name: string }) {
  const tone = DOT[[...name].reduce((n, c) => n + c.charCodeAt(0), 0) % DOT.length];
  return (
    <span className="flex items-center gap-2">
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tone}`}>{name.charAt(0).toUpperCase()}</span>
      {name}
    </span>
  );
}

export function ItemRequisitionPageView() {
  const { push } = useRouter();
  const [q, setQ] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: rows } = useGetItemRequisitionList({ page, limit: pageSize });
  const detailHref = (id: string) => `${Paths.testingRequisition.list}/${id}`;
  // ponytail: search filters current page only; send q to API when backend supports it
  const needle = q.trim().toLowerCase();
  const visible = (rows?.data ?? []).filter(
    (i) => !needle || `${i.product.productName} ${i.product.productNo}`.toLowerCase().includes(needle),
  );
  const pg = rows?.pagination;

  const columns: Column<TestingRequisitionListResponse>[] = useMemo(
    () => [
      {
        header: "Part No",
        cell: (i) => <Mono>{i.product.productNo}</Mono>,
      },
      {
        header: "Product Name",
        cell: (i) => <span className="font-medium text-slate-900">{i.product.productName}</span>,
      },
      { header: "Customer Name", cell: (i) => <Customer name={i.customer.customerName} /> },
      {
        header: "Product Drawing Number",
        cell: (i) => <Mono>{i.product.productDrawingNumber}</Mono>,
      },
      { header: "Mould No", cell: (i) => i.product.mouldNo },
      { header: "Equipment No", cell: (i) => i.product.equipmentNo },
      {
        header: "Cavity No",
        cell: (i) => (
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
            {i.product.cavityNo}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: (m) => (
          <Link
            href={detailHref(m.id)}
            onClick={(e) => e.stopPropagation()}
            aria-label="View Detail"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent bg-slate-50 text-slate-500 transition-all hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
          >
            <Eye className="size-4" />
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <ListPageTemplate
      title="Items Requisition"
      placeholder="Search product name, product no"
      query={q}
      onQuery={setQ}
      addHref={Paths.testingRequisition.create}
      addLabel="Item Requisition"
    >
      <DataTable
        columns={columns}
        rows={visible}
        rowKey={(i) => i.id}
        empty="No items found."
        onRowClick={(i) => push(detailHref(i.id))}
        pagination={{
          currentPage: page,
          totalPages: Math.max(pg?.totalPage ?? 1, 1),
          pageSize,
          totalItems: pg?.total ?? 0,
          onPageChange: setPage,
          onPageSizeChange: (n) => { setPageSize(n); setPage(1); },
        }}
      />
    </ListPageTemplate>
  );
}
