import { Eye, Trash2 } from "lucide-react";
import { IconButton } from "@/app/components/atoms/icon-button";
import { DataTable, type Column } from "@/app/components/organisms/data-table";
import { money, type Material } from "@/lib/data";

export function MaterialsTable({
  materials,
  onView,
  onDelete,
}: {
  materials: Material[];
  onView: (m: Material) => void;
  onDelete: (m: Material) => void;
}) {
  const columns: Column<Material>[] = [
    { header: "Material Code", cell: (m) => m.code, className: "font-mono text-xs" },
    { header: "Material Name", cell: (m) => m.name, className: "whitespace-nowrap font-medium" },
    { header: "Category", cell: (m) => m.category },
    { header: "Unit Stock", cell: (m) => `${m.stock} ${m.unit}` },
    { header: "Unit Price", cell: (m) => `${money(m.unitPrice)} / ${m.unit}` },
    { header: "Supplier", cell: (m) => m.supplier, className: "whitespace-nowrap" },
    {
      header: "Actions",
      cell: (m) => (
        <div className="flex gap-1">
          <IconButton icon={Eye} label={`View ${m.name}`} onClick={() => onView(m)} />
          <IconButton icon={Trash2} label={`Delete ${m.name}`} tone="danger" onClick={() => onDelete(m)} />
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} rows={materials} rowKey={(m) => m.code} empty="No materials found." />;
}
