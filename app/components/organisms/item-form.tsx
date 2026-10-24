"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type * as yup from "yup";
import { Input } from "@/app/components/atoms/input";
import { Textarea } from "@/app/components/atoms/textarea";
import { Field } from "@/app/components/molecules/field";
import { FormActions } from "@/app/components/molecules/form-actions";
import { Select } from "@/app/components/molecules/select";
import { SwitchField } from "@/app/components/molecules/switch-field";
import { itemCategories, type Item } from "@/lib/data";
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid max-w-3xl gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      <Field label="Name" error={errors.name?.message}>
        <Input {...register("name")} />
      </Field>
      <Field label="Category" error={errors.category?.message}>
        <Select options={itemCategories} placeholder="Select category" {...register("category")} />
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
      <SwitchField checked={active} onChange={setActive} />
      <Field label="Description" className="sm:col-span-2">
        <Textarea {...register("description")} rows={4} />
      </Field>
      <FormActions className="sm:col-span-2" onCancel={() => router.push("/dashboard/items")} />
    </form>
  );
}
