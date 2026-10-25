export type ItemMaterialResponse = {
  id: string;
  name: string;
  createdAt: string;
}

export type ItemDetailResponse = {
  no: number;
  sapPn: string;
  starkeyPn: string;
  itemName: string;
  mouldNo: string;
  equipmentNo: string;
  material: ItemMaterialResponse;
  rm: string;
  id: string;
};