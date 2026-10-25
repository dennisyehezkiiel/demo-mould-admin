"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { IconButton } from "@/app/components/atoms/icon-button";
import { ConfirmDelete } from "@/app/components/molecules/confirm-delete";
import { ItemDetailModal } from "@/app/components/organisms/item-detail-modal";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import type { Item } from "@/lib/data";
import { Column, DataTable } from "../organisms/data-table";
import { itemService } from "@/lib/service/item-service";
import { useNotifyError } from "@/lib/use-notify-error";
import { ItemDetailResponse } from "@/app/types/response/item-response";

export function ItemsPageView() {
  const notifyError = useNotifyError();
  const [q, setQ] = useState("");
  const [view, setView] = useState<ItemDetailResponse | null>(null);
  const [del, setDel] = useState<Item>();
  const [rows, setRows] = useState<Item[] | []>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const showDetail = useCallback(
    async (no: string) => {
      try {
        const detail = await itemService.detail(no);
        setView(detail);
      } catch (error) {
        notifyError(error);
      }
    },
    [notifyError],
  );

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
      {
        header: "Actions",
        cell: (i) => (
          <div className="flex gap-1">
            <IconButton
              icon={Eye}
              label={`View ${i.itemName}`}
              onClick={() => showDetail(i.id)}
            />
            <IconButton
              icon={Trash2}
              label={`Delete ${i.itemName}`}
              tone="danger"
              onClick={() => setDel(i)}
            />
          </div>
        ),
      },
    ],
    [showDetail],
  );

  async function confirmDelete() {
    if (!del) return;
    try {
      await itemService.delete(del.id);
      setDel(undefined);
      setRefetch(true);
    } catch (error) {
      notifyError(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await itemService.list();
        setRows(data);
      } catch (error) {
        notifyError(error);
      }
    };

    fetchData();
  }, [notifyError, refetch]);

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
      {view && <ItemDetailModal item={view} onClose={() => setView(null)} />}
      <ConfirmDelete
        name={del?.itemName}
        onCancel={() => setDel(undefined)}
        onConfirm={confirmDelete}
      />
    </ListPageTemplate>
  );
}
