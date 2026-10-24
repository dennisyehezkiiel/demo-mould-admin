import { DetailGrid } from "@/app/components/molecules/detail-grid";
import { Modal } from "@/app/components/molecules/modal";
import { money, type Material } from "@/lib/data";

export function MaterialDetailModal({ material, onClose }: { material?: Material; onClose: () => void }) {
  return (
    <Modal open={!!material} onClose={onClose} title={material?.name ?? ""}>
      {material && (
        <DetailGrid
          rows={[
            ["Code", material.code],
            ["Category", material.category],
            ["Unit type", material.unit],
            ["Stock level", `${material.stock} ${material.unit}`],
            ["Cost per unit", `${money(material.unitPrice)} / ${material.unit}`],
            ["Stock value", money(material.stock * material.unitPrice)],
            ["Supplier", material.supplier],
            ["Description", material.description || "—"],
          ]}
        />
      )}
    </Modal>
  );
}
