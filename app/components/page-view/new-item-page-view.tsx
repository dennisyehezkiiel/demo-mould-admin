"use client";

import { FormPageTemplate } from "@/app/components/templates/form-page-template";
import { createItemRequisitionData } from "@/app/data/item-requisition";
import type { CreateItemRequisitionType } from "@/app/types/request/item-requisition-type";
import { useForm } from "react-hook-form";
import CreateItemRequisitionForm from "../organisms/form/create-item-requisition-form";

export function NewItemPageView() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateItemRequisitionType>({
    defaultValues: createItemRequisitionData,
  });

  return (
    <FormPageTemplate title="Testing Requisition">
      <CreateItemRequisitionForm
        register={register}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit((data) => console.log(data))}
      />
    </FormPageTemplate>
  );
}
