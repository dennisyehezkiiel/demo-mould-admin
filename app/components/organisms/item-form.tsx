"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Item } from "@/lib/data";
import { Input } from "@/app/components/atoms/input";
import { Field } from "@/app/components/molecules/field";
import { FormActions } from "@/app/components/molecules/form-actions";
import { itemSchema } from "@/lib/schemas";
import { itemService, type ItemBody } from "@/lib/service/item-service";
import { useNotifyError } from "@/lib/use-notify-error";

const fields: { name: keyof ItemBody; label: string }[] = [
  { name: "sapPn", label: "SAP PN" },
  { name: "starkeyPn", label: "Starkey PN" },
  { name: "itemName", label: "Item name" },
  { name: "mould", label: "Mould" },
  { name: "equipment", label: "Equipment" },
  { name: "material", label: "Material" },
  { name: "rm", label: "RM" },
];

export function ItemForm({ item }: { item?: Item }) {
  const router = useRouter();
  const notifyError = useNotifyError();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ItemBody>({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      sapPn: item?.sapPn,
      starkeyPn: item?.starkeyPn,
      itemName: item?.itemName,
      mould: item?.mould,
      equipment: item?.equipment,
      material: item?.material,
      rm: item?.rm,
    },
  });

  async function onSubmit(data: ItemBody) {
    try {
      await (item ? itemService.update(item.no, data) : itemService.create(data));
      router.push("/dashboard/items");
    } catch (error) {
      notifyError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid max-w-3xl gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      {fields.map(({ name, label }) => (
        <Field key={name} label={label} error={errors[name]?.message}>
          <Input {...register(name)} />
        </Field>
      ))}
      <FormActions className="sm:col-span-2" loading={isSubmitting} onCancel={() => router.push("/dashboard/items")} />
    </form>
  );
}
