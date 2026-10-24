"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type * as yup from "yup";
import { Input } from "@/app/components/atoms/input";
import { Textarea } from "@/app/components/atoms/textarea";
import { Field } from "@/app/components/molecules/field";
import { FormActions } from "@/app/components/molecules/form-actions";
import { Select } from "@/app/components/molecules/select";
import { materialCategories, unitTypes } from "@/lib/data";
import { materialSchema } from "@/lib/schemas";
import { useStore } from "@/lib/store";

export function MaterialForm() {
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid max-w-3xl gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      <Field label="Material name" error={errors.name?.message}><Input {...register("name")} /></Field>
      <Field label="Material code" error={errors.code?.message}><Input {...register("code")} /></Field>
      <Field label="Category" error={errors.category?.message}>
        <Select options={materialCategories} placeholder="Select category" {...register("category")} />
      </Field>
      <Field label="Unit type" error={errors.unit?.message}>
        <Select options={unitTypes} placeholder="Select unit" {...register("unit")} />
      </Field>
      <Field label="Stock level" error={errors.stock?.message}><Input type="number" step="any" {...register("stock")} /></Field>
      <Field label="Cost per unit (USD)" error={errors.unitPrice?.message}><Input type="number" step="0.01" {...register("unitPrice")} /></Field>
      <Field label="Supplier" className="sm:col-span-2" error={errors.supplier?.message}><Input {...register("supplier")} /></Field>
      <Field label="Description" className="sm:col-span-2">
        <Textarea {...register("description")} rows={3} />
      </Field>
      <FormActions className="sm:col-span-2" onCancel={() => router.push("/dashboard/materials")} />
    </form>
  );
}
