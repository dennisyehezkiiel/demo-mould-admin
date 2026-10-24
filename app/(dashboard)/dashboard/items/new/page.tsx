import { ItemForm } from "@/components/item-form";
import { PageHeader } from "@/components/ui";

export default function NewItemPage() {
  return (
    <>
      <PageHeader title="Add Item" />
      <ItemForm />
    </>
  );
}
