"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialMaterials, type Item, type Material } from "./data";

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
  const [items, setItems] = useState([]);
  const [materials, setMaterials] = useState(initialMaterials);

  const store: Store = {
    items,
    materials,
    saveItem: (item) => null,
    deleteItem: (id) => null,
    addMaterial: (m) => null,
    deleteMaterial: (code) => null,
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
