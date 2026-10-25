"use client";

import { useEffect, useState } from "react";
import { ItemForm } from "@/app/components/organisms/item-form";
import { FormPageTemplate } from "@/app/components/templates/form-page-template";
import type { Item } from "@/lib/data";
import { itemService } from "@/lib/service/item-service";
import { useNotifyError } from "@/lib/use-notify-error";

export function EditItemContentView({ id }: { id: number }) {
  const notifyError = useNotifyError();
  const [item, setItem] = useState<Item>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    itemService.detail(id).then(setItem).catch((e) => {
      notifyError(e);
      setFailed(true);
    });
  }, [id, notifyError]);

  if (failed) return <p className="text-sm text-muted-foreground">Item not found.</p>;
  if (!item) return <p className="text-sm text-muted-foreground">Loading…</p>;
  return (
    <FormPageTemplate title={`Edit ${item.itemName}`}>
      <ItemForm item={item} />
    </FormPageTemplate>
  );
}
