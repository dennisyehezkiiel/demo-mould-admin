"use client";

import { useEffect, useMemo, useState } from "react";
import { ConfirmDelete } from "@/app/components/molecules/confirm-delete";
import { ItemDetailModal } from "@/app/components/organisms/item-detail-modal";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import type { Item } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Column, DataTable } from "../organisms/data-table";
import { itemService } from "@/lib/service/item-service";

export function ItemsPageView() {
  const { deleteItem } = useStore();
  const [q, setQ] = useState("");
  const [view, setView] = useState<Item>();
  const [del, setDel] = useState<Item>();
  const [rows, setRows] = useState<Item[] | []>([]);

  const columns: Column<Item>[] = useMemo(
    () => [
      { header: "No", cell: (i) => i.no, className: "text-muted-foreground" },
      { header: "SAP PN", cell: (i) => i.sapPn, className: "font-medium" },
      { header: "Starkey PN", cell: (i) => i.starkeyPn },
      { header: "Item Name", cell: (i) => i.itemName },
      { header: "Mould", cell: (i) => i.mould },
      { header: "Equipment", cell: (i) => i.equipment },
      { header: "Material", cell: (i) => i.material },
      { header: "RM", cell: (i) => i.rm },
    ],
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await itemService.list();
        setRows(data);
      } catch (error) {
        console.log(error, ">>>>cek error");
      }
    };

    fetchData();
  }, []);

  return (
    <ListPageTemplate
      title="Items"
      placeholder="Search name, SKU, category…"
      query={q}
      onQuery={setQ}
      addHref="/dashboard/items/new"
      addLabel="Add Item"
    >
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(i) => i.no}
        empty="No items found."
      />
      <ItemDetailModal item={view} onClose={() => setView(undefined)} />
      <ConfirmDelete
        name={del?.itemName}
        onCancel={() => setDel(undefined)}
        onConfirm={() => {
          if (del) deleteItem(del.no);
          setDel(undefined);
        }}
      />
    </ListPageTemplate>
  );
}
