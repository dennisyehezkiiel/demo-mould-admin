"use client";

import { useMemo, useState } from "react";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import { Column, DataTable } from "../organisms/data-table";
import Paths from "@/lib/route-paths";
import { useGetItemRequisitionList } from "@/lib/service/testing-requisition-service";
import { TestingRequisitionListResponse } from "@/app/types/response/testing-requisition-response";
import { IconButton } from "../atoms/icon-button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export function ItemRequisitionPageView() {
  const { push } = useRouter();
  const [q, setQ] = useState("");

  const { data: rows } = useGetItemRequisitionList();

  const columns: Column<TestingRequisitionListResponse>[] = useMemo(
    () => [
      {
        header: "Part No",
        cell: (i) => i.product.productNo,
        className: "text-muted-foreground",
      },
      {
        header: "Product Name",
        cell: (i) => i.product.productName,
        className: "font-medium",
      },
      { header: "Customer Name", cell: (i) => i.customer.customerName },
      {
        header: "Product Drawing Number",
        cell: (i) => i.product.productDrawingNumber,
      },
      { header: "Mould No", cell: (i) => i.product.mouldNo },
      { header: "Equipment No", cell: (i) => i.product.equipmentNo },
      { header: "Cavity No", cell: (i) => i.product.cavityNo },
      {
        header: "Actions",
        cell: (m) => (
          <div className="flex gap-1">
            <IconButton
              icon={Eye}
              label={"View Detail"}
              onClick={() => push(`${Paths.testingRequisition.list}/${m.id}`)}
              iconTone="info"
            />
          </div>
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
        rows={rows?.data || []}
        rowKey={(i) => i.id}
        empty="No items found."
      />
    </ListPageTemplate>
  );
}
