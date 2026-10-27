import { ItemForm } from "@/app/components/organisms/form/item-form";
import { FormPageTemplate } from "@/app/components/templates/form-page-template";
import { createItemRequisitionData } from "@/app/data/item-requisition";
import { useForm } from "react-hook-form";

export function NewItemPageView() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: createItemRequisitionData,
  });

  return (
    <FormPageTemplate title="Testing Requisition">
      <ItemForm />
    </FormPageTemplate>
  );
}
