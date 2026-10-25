import { DetailGrid } from "@/app/components/molecules/detail-grid";
import { Modal } from "@/app/components/molecules/modal";
import type { Item } from "@/lib/data";

export function ItemDetailModal({ item, onClose }: { item?: Item; onClose: () => void }) {
  return (
    <Modal open={!!item} onClose={onClose} title={item?.itemName ?? ""}>
      {item && (
        <DetailGrid
          rows={[
            ["No", item.no],
            ["SAP PN", item.sapPn],
            ["Starkey PN", item.starkeyPn],
            ["Item name", item.itemName],
            ["Mould", item.mould],
            ["Equipment", item.equipment],
            ["Material", item.material],
            ["RM", item.rm],
          ]}
        />
      )}
    </Modal>
  );
}
