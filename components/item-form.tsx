"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Field, Input, inputCls } from "@/components/ui";
import { itemCategories, type Item } from "@/lib/data";
import { useStore } from "@/lib/store";

export function ItemForm({ item }: { item?: Item }) {
  const router = useRouter();
  const { saveItem } = useStore();
  const [active, setActive] = useState(item?.active ?? true);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    saveItem({
      id: item?.id,
      name: String(f.get("name")),
      category: String(f.get("category")),
      sku: String(f.get("sku")),
      price: Number(f.get("price")),
      quantity: Number(f.get("quantity")),
      description: String(f.get("description")),
      active,
    });
    router.push("/dashboard/items");
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-3xl gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
      <Field label="Name">
        <Input name="name" required defaultValue={item?.name} />
      </Field>
      <Field label="Category">
        <select name="category" required defaultValue={item?.category ?? ""} className={inputCls}>
          <option value="" disabled>Select category</option>
          {itemCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="SKU">
        <Input name="sku" required defaultValue={item?.sku} />
      </Field>
      <Field label="Price (USD)">
        <Input name="price" type="number" min="0" step="0.01" required defaultValue={item?.price} />
      </Field>
      <Field label="Stock quantity">
        <Input name="quantity" type="number" min="0" step="1" required defaultValue={item?.quantity} />
      </Field>
      <div className="flex items-end pb-1">
        <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={() => setActive(!active)}
            className={`relative h-6 w-11 rounded-full transition-colors ${active ? "bg-emerald-500" : "bg-slate-300"}`}
          >
            <span className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform ${active ? "translate-x-5" : ""}`} />
          </button>
          {active ? "Active" : "Inactive"}
        </label>
      </div>
      <Field label="Description" className="sm:col-span-2">
        <textarea name="description" rows={4} defaultValue={item?.description} className={`${inputCls} h-auto py-2`} />
      </Field>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/items")}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
