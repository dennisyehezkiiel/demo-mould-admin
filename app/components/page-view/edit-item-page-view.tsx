import { Suspense } from "react";
import { EditItemContentView } from "@/app/components/page-view/edit-item-content-view";

export function EditItemPageView({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
      <EditItemLoader params={params} />
    </Suspense>
  );
}

async function EditItemLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditItemContentView id={Number(id)} />;
}
