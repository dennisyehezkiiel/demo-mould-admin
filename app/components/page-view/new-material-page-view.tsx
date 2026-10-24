import { MaterialForm } from "@/app/components/organisms/material-form";
import { FormPageTemplate } from "@/app/components/templates/form-page-template";

export function NewMaterialPageView() {
  return (
    <FormPageTemplate title="Add Material">
      <MaterialForm />
    </FormPageTemplate>
  );
}
