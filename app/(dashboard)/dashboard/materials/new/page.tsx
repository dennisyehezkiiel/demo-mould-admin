"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, PageHeader, inputCls } from "@/components/ui";
import { materialCategories, unitTypes } from "@/lib/data";
import type * as yup from "yup";
import { materialSchema } from "@/lib/schemas";
import { useStore } from "@/lib/store";

export default function NewMaterialPage() {
  const router = useRouter();
  const { materials, addMaterial } = useStore();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(materialSchema),
    defaultValues: { category: "", unit: "", description: "" },
  });

  function onSubmit(data: yup.InferType<typeof materialSchema>) {
    const code = data.code.toUpperCase();
    if (materials.some((m) => m.code === code)) return setError("code", { message: "Code already exists" });
    addMaterial({ ...data, code });
    router.push("/dashboard/materials");
  }

  return (
    <>
      <PageHeader title="Add Material" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid max-w-3xl gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <Field label="Material name" error={errors.name?.message}><Input {...register("name")} /></Field>
        <Field label="Material code" error={errors.code?.message}><Input {...register("code")} /></Field>
        <Field label="Category" error={errors.category?.message}>
          <select {...register("category")} className={inputCls}>
            <option value="" disabled>Select category</option>
            {materialCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Unit type" error={errors.unit?.message}>
          <select {...register("unit")} className={inputCls}>
            <option value="" disabled>Select unit</option>
            {unitTypes.map((u) => <option key={u}>{u}</option>)}
          </select>
        </Field>
        <Field label="Stock level" error={errors.stock?.message}><Input type="number" step="any" {...register("stock")} /></Field>
        <Field label="Cost per unit (USD)" error={errors.unitPrice?.message}><Input type="number" step="0.01" {...register("unitPrice")} /></Field>
        <Field label="Supplier" className="sm:col-span-2" error={errors.supplier?.message}><Input {...register("supplier")} /></Field>
        <Field label="Description" className="sm:col-span-2">
          <textarea {...register("description")} rows={3} className={`${inputCls} h-auto py-2`} />
        </Field>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/materials")}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
