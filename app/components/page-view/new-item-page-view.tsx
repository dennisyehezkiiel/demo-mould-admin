import { ItemForm } from "@/app/components/item-form";
import { PageHeader } from "@/app/components/ui";

export function NewItemPageView() {
  return (
    <>
      <PageHeader title="Add Item" />
      <ItemForm />
    </>
  );
}
