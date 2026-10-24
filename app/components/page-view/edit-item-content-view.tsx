"use client";

import { ItemForm } from "@/app/components/item-form";
import { PageHeader } from "@/app/components/ui";
import { useStore } from "@/lib/store";

export function EditItemContentView({ id }: { id: number }) {
  const item = useStore().items.find((i) => i.id === id);
  if (!item) return <p className="text-sm text-slate-500">Item not found.</p>;
  return (
    <>
      <PageHeader title={`Edit ${item.name}`} />
      <ItemForm item={item} />
    </>
  );
}
