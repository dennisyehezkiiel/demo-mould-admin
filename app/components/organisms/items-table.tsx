import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/app/components/atoms/badge";
import { IconButton } from "@/app/components/atoms/icon-button";
import { DataTable, type Column } from "@/app/components/organisms/data-table";
import { money, type Item } from "@/lib/data";

export function ItemsTable({
  items,
  onView,
  onDelete,
}: {
  items: Item[];
  onView: (i: Item) => void;
  onDelete: (i: Item) => void;
}) {
  const columns: Column<Item>[] = [
    { header: "ID", cell: (i) => i.id, className: "text-muted-foreground" },
    { header: "Item Name", cell: (i) => i.name, className: "font-medium" },
    { header: "Category", cell: (i) => i.category },
    { header: "SKU", cell: (i) => i.sku, className: "font-mono text-xs" },
    { header: "Quantity", cell: (i) => i.quantity },
    { header: "Price", cell: (i) => money(i.price) },
    {
      header: "Status",
      cell: (i) => <Badge variant={i.active ? "default" : "secondary"}>{i.active ? "Active" : "Inactive"}</Badge>,
    },
    {
      header: "Actions",
      cell: (i) => (
        <div className="flex gap-1">
          <IconButton icon={Eye} label={`View ${i.name}`} onClick={() => onView(i)} />
          <IconButton icon={Pencil} label={`Edit ${i.name}`} href={`/dashboard/items/${i.id}/edit`} />
          <IconButton icon={Trash2} label={`Delete ${i.name}`} tone="danger" onClick={() => onDelete(i)} />
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} rows={items} rowKey={(i) => i.id} empty="No items found." />;
}
