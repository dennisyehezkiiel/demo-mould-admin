import { DetailGrid } from "@/app/components/molecules/detail-grid";
import { Modal } from "@/app/components/molecules/modal";
import { ItemDetailResponse } from "@/app/types/response/item-response";

export function ItemDetailModal({ item, onClose }: { item?: ItemDetailResponse; onClose: () => void }) {
  return (
    <Modal open={!!item} onClose={onClose} title={item?.itemName ?? ""}>
      {item && (
        <DetailGrid
          rows={[
            ["SAP PN", item.sapPn],
            ["Starkey PN", item.starkeyPn],
            ["Item name", item.itemName],
            ["Mould", item.mouldNo],
            ["Equipment", item.equipmentNo],
            ["Material", item?.material?.name],
            ["RM", item.rm],
          ]}
        />
      )}
    </Modal>
  );
}
