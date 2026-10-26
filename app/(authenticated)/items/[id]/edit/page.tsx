import { EditItemPageView } from "@/app/components/page-view/edit-item-page-view";

export default function Page({ params }: PageProps<"/items/[id]/edit">) {
  return <EditItemPageView params={params} />;
}
