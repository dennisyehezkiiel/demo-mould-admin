"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialItems, initialMaterials, type Item, type Material } from "./data";

type Store = {
  items: Item[];
  materials: Material[];
  saveItem: (item: Omit<Item, "id" | "createdAt"> & { id?: number }) => void;
  deleteItem: (id: number) => void;
  addMaterial: (m: Material) => void;
  deleteMaterial: (code: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}

// ponytail: in-memory only, resets on full reload. Swap for API calls when a backend exists.
export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState(initialItems);
  const [materials, setMaterials] = useState(initialMaterials);

  const store: Store = {
    items,
    materials,
    saveItem: (item) =>
      setItems((prev) =>
        item.id
          ? prev.map((i) => (i.id === item.id ? { ...i, ...item, id: i.id } : i))
          : [...prev, { ...item, id: Math.max(0, ...prev.map((i) => i.id)) + 1, createdAt: new Date().toISOString().slice(0, 10) }],
      ),
    deleteItem: (id) => setItems((p) => p.filter((i) => i.id !== id)),
    addMaterial: (m) => setMaterials((p) => [...p, m]),
    deleteMaterial: (code) => setMaterials((p) => p.filter((m) => m.code !== code)),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
