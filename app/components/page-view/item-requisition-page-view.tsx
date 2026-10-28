"use client";

import { useMemo, useState } from "react";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import { Column, DataTable } from "../organisms/data-table";
import Paths from "@/lib/route-paths";
import { useGetItemRequisitionList } from "@/lib/service/testing-requisition-service";
import { TestingRequisitionListResponse } from "@/app/types/response/testing-requisition-response";

export function ItemRequisitionPageView() {
  const [q, setQ] = useState("");

  const { data: rows } = useGetItemRequisitionList();

  const columns: Column<TestingRequisitionListResponse>[] = useMemo(
    () => [
      { header: "Part No", cell: (i) => i.product.productNo, className: "text-muted-foreground" },
      { header: "Product Name", cell: (i) => i.product.productName, className: "font-medium" },
      { header: "Customer Name", cell: (i) => i.customer.customerName },
      { header: "Product Drawing Number", cell: (i) => i.product.productDrawingNumber },
      { header: "Mould No", cell: (i) => i.product.mouldNo },
      { header: "Equipment No", cell: (i) => i.product.equipmentNo },
      { header: "Cavity No", cell: (i) => i.product.cavityNo },
      { header: "Inspection Sample", cell: (i) => `${i.inspectionSample} Shots` },
      { header: "Toolroom Sample", cell: (i) => `${i.toolroomSample} Shots` },
      { header: "Client Sample", cell: (i) => `${i.clientSample} Shots` },

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
        rows={rows?.data || []}
        rowKey={(i) => i.id}
        empty="No items found."
      />
    </ListPageTemplate>
  );
}
