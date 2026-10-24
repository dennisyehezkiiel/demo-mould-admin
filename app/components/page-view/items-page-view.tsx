"use client";

import { useState } from "react";
import { ConfirmDelete } from "@/app/components/molecules/confirm-delete";
import { ItemDetailModal } from "@/app/components/organisms/item-detail-modal";
import { ItemsTable } from "@/app/components/organisms/items-table";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import type { Item } from "@/lib/data";
import { useStore } from "@/lib/store";

export function ItemsPageView() {
  const { items, deleteItem } = useStore();
  const [q, setQ] = useState("");
  const [view, setView] = useState<Item>();
  const [del, setDel] = useState<Item>();

  const rows = items.filter((i) =>
    [i.name, i.sku, i.category].some((v) => v.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <ListPageTemplate
      title="Items"
      placeholder="Search name, SKU, category…"
      query={q}
      onQuery={setQ}
      addHref="/dashboard/items/new"
      addLabel="Add Item"
    >
      <ItemsTable items={rows} onView={setView} onDelete={setDel} />
      <ItemDetailModal item={view} onClose={() => setView(undefined)} />
      <ConfirmDelete
        name={del?.name}
        onCancel={() => setDel(undefined)}
        onConfirm={() => {
          if (del) deleteItem(del.id);
          setDel(undefined);
        }}
      />
    </ListPageTemplate>
  );
}
