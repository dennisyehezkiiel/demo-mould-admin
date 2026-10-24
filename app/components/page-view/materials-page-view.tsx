"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Plus, Search, Trash2 } from "lucide-react";
import { Button, ConfirmDelete, DetailGrid, Input, Modal, PageHeader } from "@/app/components/ui";
import { money, type Material } from "@/lib/data";
import { useStore } from "@/lib/store";

export function MaterialsPageView() {
  const { materials, deleteMaterial } = useStore();
  const [q, setQ] = useState("");
  const [view, setView] = useState<Material>();
  const [del, setDel] = useState<Material>();

  const rows = materials.filter((m) =>
    [m.code, m.name, m.supplier, m.category].some((v) => v.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <>
      <PageHeader title="Materials" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search code, name, supplier…" className="pl-9" aria-label="Search materials" />
        </div>
        <Link href="/dashboard/materials/new">
          <Button><Plus className="size-4" /> Add Material</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {["Material Code", "Material Name", "Category", "Unit Stock", "Unit Price", "Supplier", "Actions"].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((m) => (
              <tr key={m.code} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs">{m.code}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3">{m.category}</td>
                <td className="px-4 py-3">{m.stock} {m.unit}</td>
                <td className="px-4 py-3">{money(m.unitPrice)} / {m.unit}</td>
                <td className="whitespace-nowrap px-4 py-3">{m.supplier}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => setView(m)} aria-label={`View ${m.name}`} className="rounded-md p-2 text-slate-600 hover:bg-slate-100"><Eye className="size-4" /></button>
                    <button onClick={() => setDel(m)} aria-label={`Delete ${m.name}`} className="rounded-md p-2 text-rose-600 hover:bg-rose-50"><Trash2 className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-500">No materials found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!view} onClose={() => setView(undefined)} title={view?.name ?? ""}>
        {view && (
          <DetailGrid
            rows={[
              ["Code", view.code],
              ["Category", view.category],
              ["Unit type", view.unit],
              ["Stock level", `${view.stock} ${view.unit}`],
              ["Cost per unit", `${money(view.unitPrice)} / ${view.unit}`],
              ["Stock value", money(view.stock * view.unitPrice)],
              ["Supplier", view.supplier],
              ["Description", view.description || "—"],
            ]}
          />
        )}
      </Modal>

      <ConfirmDelete
        name={del?.name}
        onCancel={() => setDel(undefined)}
        onConfirm={() => {
          if (del) deleteMaterial(del.code);
          setDel(undefined);
        }}
      />
    </>
  );
}
