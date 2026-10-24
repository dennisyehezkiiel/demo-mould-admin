"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Field, Input, PageHeader, inputCls } from "@/components/ui";
import { materialCategories, unitTypes } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function NewMaterialPage() {
  const router = useRouter();
  const { materials, addMaterial } = useStore();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const code = String(f.get("code")).trim().toUpperCase();
    if (materials.some((m) => m.code === code)) return setError("Code already exists");
    addMaterial({
      code,
      name: String(f.get("name")),
      category: String(f.get("category")),
      unit: String(f.get("unit")),
      stock: Number(f.get("stock")),
      unitPrice: Number(f.get("unitPrice")),
      supplier: String(f.get("supplier")),
      description: String(f.get("description")),
    });
    router.push("/dashboard/materials");
  }

  return (
    <>
      <PageHeader title="Add Material" />
      <form onSubmit={onSubmit} className="grid max-w-3xl gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <Field label="Material name"><Input name="name" required /></Field>
        <Field label="Material code" error={error}><Input name="code" required onChange={() => setError("")} /></Field>
        <Field label="Category">
          <select name="category" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select category</option>
            {materialCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Unit type">
          <select name="unit" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select unit</option>
            {unitTypes.map((u) => <option key={u}>{u}</option>)}
          </select>
        </Field>
        <Field label="Stock level"><Input name="stock" type="number" min="0" step="any" required /></Field>
        <Field label="Cost per unit (USD)"><Input name="unitPrice" type="number" min="0" step="0.01" required /></Field>
        <Field label="Supplier" className="sm:col-span-2"><Input name="supplier" required /></Field>
        <Field label="Description" className="sm:col-span-2">
          <textarea name="description" rows={3} className={`${inputCls} h-auto py-2`} />
        </Field>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/materials")}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
