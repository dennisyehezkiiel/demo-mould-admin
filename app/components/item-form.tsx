"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, inputCls } from "@/app/components/ui";
import { itemCategories, type Item } from "@/lib/data";
import type * as yup from "yup";
import { itemSchema } from "@/lib/schemas";
import { useStore } from "@/lib/store";

export function ItemForm({ item }: { item?: Item }) {
  const router = useRouter();
  const { saveItem } = useStore();
  const [active, setActive] = useState(item?.active ?? true);

  const { register, handleSubmit, formState: { errors } } = useForm<yup.InferType<typeof itemSchema>>({
    resolver: yupResolver(itemSchema),
    defaultValues: { name: item?.name, category: item?.category ?? "", sku: item?.sku, price: item?.price, quantity: item?.quantity, description: item?.description ?? "" },
  });

  function onSubmit(data: yup.InferType<typeof itemSchema>) {
    saveItem({ id: item?.id, ...data, active });
    router.push("/dashboard/items");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid max-w-3xl gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
      <Field label="Name" error={errors.name?.message}>
        <Input {...register("name")} />
      </Field>
      <Field label="Category" error={errors.category?.message}>
        <select {...register("category")} className={inputCls}>
          <option value="" disabled>Select category</option>
          {itemCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="SKU" error={errors.sku?.message}>
        <Input {...register("sku")} />
      </Field>
      <Field label="Price (USD)" error={errors.price?.message}>
        <Input type="number" step="0.01" {...register("price")} />
      </Field>
      <Field label="Stock quantity" error={errors.quantity?.message}>
        <Input type="number" step="1" {...register("quantity")} />
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
        <textarea {...register("description")} rows={4} className={`${inputCls} h-auto py-2`} />
      </Field>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/items")}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
