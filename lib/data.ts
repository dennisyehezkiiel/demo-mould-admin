export type Item = {
  no: number;
  sapPn: string;
  starkeyPn: string;
  itemName: string;
  mould: string;
  equipment: string;
  material: string;
  rm: string;
};

export type Material = {
  code: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  unitPrice: number;
  supplier: string;
  description: string;
};

export const itemCategories = ["Mould", "Insert", "Tooling", "Accessory"];
export const materialCategories = ["Steel", "Aluminium", "Polymer", "Hardware"];
export const unitTypes = ["kg", "pcs", "m", "L", "sheet"];

export const initialMaterials: Material[] = [
  { code: "MAT-001", name: "P20 Tool Steel", category: "Steel", unit: "kg", stock: 850, unitPrice: 6.4, supplier: "Nordic Steel Co.", description: "Pre-hardened mould steel, 300 HB." },
  { code: "MAT-002", name: "H13 Tool Steel", category: "Steel", unit: "kg", stock: 420, unitPrice: 9.8, supplier: "Nordic Steel Co.", description: "Hot work steel for high-temperature moulds." },
  { code: "MAT-003", name: "Aluminium 7075", category: "Aluminium", unit: "sheet", stock: 64, unitPrice: 135, supplier: "AluMax Ltd.", description: "Aerospace-grade plate, 1220x2440mm." },
  { code: "MAT-004", name: "Nylon PA66", category: "Polymer", unit: "kg", stock: 1200, unitPrice: 4.1, supplier: "PolyWorks", description: "Glass-filled nylon granules." },
  { code: "MAT-005", name: "M8 Socket Screw", category: "Hardware", unit: "pcs", stock: 5400, unitPrice: 0.22, supplier: "FastenPro", description: "Class 12.9 socket head cap screw." },
  { code: "MAT-006", name: "Cooling Hose 10mm", category: "Hardware", unit: "m", stock: 180, unitPrice: 2.75, supplier: "FlowTech", description: "High-pressure silicone cooling hose." },
];

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
