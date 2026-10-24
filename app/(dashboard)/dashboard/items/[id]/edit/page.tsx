import { Suspense } from "react";
import { EditItem } from "./edit-item";

export default function EditItemPage({ params }: PageProps<"/dashboard/items/[id]/edit">) {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
      <EditItemLoader params={params} />
    </Suspense>
  );
}

async function EditItemLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditItem id={Number(id)} />;
}
