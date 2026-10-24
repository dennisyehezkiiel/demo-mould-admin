import { Badge } from "@/app/components/atoms/badge";
import { DetailGrid } from "@/app/components/molecules/detail-grid";
import { Modal } from "@/app/components/molecules/modal";
import { money, type Item } from "@/lib/data";

export function ItemDetailModal({ item, onClose }: { item?: Item; onClose: () => void }) {
  return (
    <Modal open={!!item} onClose={onClose} title={item?.name ?? ""}>
      {item && (
        <DetailGrid
          rows={[
            ["SKU", item.sku],
            ["Category", item.category],
            ["Price", money(item.price)],
            ["Stock", item.quantity > 0 ? `${item.quantity} in stock` : <Badge variant="destructive">Out of stock</Badge>],
            ["Status", item.active ? "Active" : "Inactive"],
            ["Created", item.createdAt],
            ["Description", item.description || "—"],
          ]}
        />
      )}
    </Modal>
  );
}
