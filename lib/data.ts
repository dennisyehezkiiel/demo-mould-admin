export type Item = {
  id: number;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  price: number;
  description: string;
  active: boolean;
  createdAt: string;
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

export const initialItems: Item[] = [
  { id: 1, name: "Injection Mould A12", category: "Mould", sku: "MLD-A12", quantity: 14, price: 4850, description: "Two-cavity injection mould for housing parts.", active: true, createdAt: "2026-01-12" },
  { id: 2, name: "Core Insert 40mm", category: "Insert", sku: "INS-040", quantity: 120, price: 65.5, description: "Hardened steel core insert, 40mm diameter.", active: true, createdAt: "2026-02-03" },
  { id: 3, name: "Cavity Plate B7", category: "Tooling", sku: "TLG-B07", quantity: 0, price: 1290, description: "Polished cavity plate for B-series moulds.", active: false, createdAt: "2026-02-19" },
  { id: 4, name: "Ejector Pin Set", category: "Accessory", sku: "ACC-EJP", quantity: 340, price: 18.9, description: "Set of 12 nitrided ejector pins.", active: true, createdAt: "2026-03-08" },
  { id: 5, name: "Hot Runner Nozzle", category: "Tooling", sku: "TLG-HRN", quantity: 22, price: 420, description: "Heated nozzle for hot runner systems.", active: true, createdAt: "2026-03-27" },
  { id: 6, name: "Mould Base 300x300", category: "Mould", sku: "MLD-B300", quantity: 6, price: 2100, description: "Standard mould base, P20 steel.", active: true, createdAt: "2026-04-14" },
  { id: 7, name: "Guide Bushing", category: "Accessory", sku: "ACC-GBH", quantity: 75, price: 12.25, description: "Bronze guide bushing, self-lubricating.", active: false, createdAt: "2026-05-02" },
];

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
