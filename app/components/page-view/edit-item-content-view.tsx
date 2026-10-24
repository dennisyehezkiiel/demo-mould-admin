"use client";

import { ItemForm } from "@/app/components/organisms/item-form";
import { FormPageTemplate } from "@/app/components/templates/form-page-template";
import { useStore } from "@/lib/store";

export function EditItemContentView({ id }: { id: number }) {
  const item = useStore().items.find((i) => i.id === id);
  if (!item) return <p className="text-sm text-muted-foreground">Item not found.</p>;
  return (
    <FormPageTemplate title={`Edit ${item.name}`}>
      <ItemForm item={item} />
    </FormPageTemplate>
  );
}
