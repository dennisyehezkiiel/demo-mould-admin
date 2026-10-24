"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Badge, Button, ConfirmDelete, DetailGrid, Input, Modal, PageHeader } from "@/app/components/ui";
import { money, type Item } from "@/lib/data";
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
    <>
      <PageHeader title="Items" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, SKU, category…" className="pl-9" aria-label="Search items" />
        </div>
        <Link href="/dashboard/items/new">
          <Button><Plus className="size-4" /> Add Item</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {["ID", "Item Name", "Category", "SKU", "Quantity", "Price", "Status", "Actions"].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((i) => (
              <tr key={i.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">{i.id}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium">{i.name}</td>
                <td className="px-4 py-3">{i.category}</td>
                <td className="px-4 py-3 font-mono text-xs">{i.sku}</td>
                <td className="px-4 py-3">{i.quantity}</td>
                <td className="px-4 py-3">{money(i.price)}</td>
                <td className="px-4 py-3"><Badge tone={i.active ? "green" : "slate"}>{i.active ? "Active" : "Inactive"}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => setView(i)} aria-label={`View ${i.name}`} className="rounded-md p-2 text-slate-600 hover:bg-slate-100"><Eye className="size-4" /></button>
                    <Link href={`/dashboard/items/${i.id}/edit`} aria-label={`Edit ${i.name}`} className="rounded-md p-2 text-slate-600 hover:bg-slate-100"><Pencil className="size-4" /></Link>
                    <button onClick={() => setDel(i)} aria-label={`Delete ${i.name}`} className="rounded-md p-2 text-rose-600 hover:bg-rose-50"><Trash2 className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-500">No items found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!view} onClose={() => setView(undefined)} title={view?.name ?? ""}>
        {view && (
          <DetailGrid
            rows={[
              ["SKU", view.sku],
              ["Category", view.category],
              ["Price", money(view.price)],
              ["Stock", view.quantity > 0 ? `${view.quantity} in stock` : <Badge tone="amber">Out of stock</Badge>],
              ["Status", view.active ? "Active" : "Inactive"],
              ["Created", view.createdAt],
              ["Description", view.description || "—"],
            ]}
          />
        )}
      </Modal>

      <ConfirmDelete
        name={del?.name}
        onCancel={() => setDel(undefined)}
        onConfirm={() => {
          if (del) deleteItem(del.id);
          setDel(undefined);
        }}
      />
    </>
  );
}
