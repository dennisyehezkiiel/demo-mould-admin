import { ItemForm } from "@/app/components/organisms/item-form";
import { FormPageTemplate } from "@/app/components/templates/form-page-template";

export function NewItemPageView() {
  return (
    <FormPageTemplate title="Testing Requisition">
      <ItemForm />
    </FormPageTemplate>
  );
}
