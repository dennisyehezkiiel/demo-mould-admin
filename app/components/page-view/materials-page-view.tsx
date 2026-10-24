"use client";

import { useState } from "react";
import { ConfirmDelete } from "@/app/components/molecules/confirm-delete";
import { MaterialDetailModal } from "@/app/components/organisms/material-detail-modal";
import { MaterialsTable } from "@/app/components/organisms/materials-table";
import { ListPageTemplate } from "@/app/components/templates/list-page-template";
import type { Material } from "@/lib/data";
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
    <ListPageTemplate
      title="Materials"
      placeholder="Search code, name, supplier…"
      query={q}
      onQuery={setQ}
      addHref="/dashboard/materials/new"
      addLabel="Add Material"
    >
      <MaterialsTable materials={rows} onView={setView} onDelete={setDel} />
      <MaterialDetailModal material={view} onClose={() => setView(undefined)} />
      <ConfirmDelete
        name={del?.name}
        onCancel={() => setDel(undefined)}
        onConfirm={() => {
          if (del) deleteMaterial(del.code);
          setDel(undefined);
        }}
      />
    </ListPageTemplate>
  );
}
