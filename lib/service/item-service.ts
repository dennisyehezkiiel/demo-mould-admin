import type * as yup from "yup";
import { api } from "@/lib/api";
import { API_PATHS } from "@/lib/api-path";
import type { Item } from "@/lib/data";
import type { itemSchema } from "@/lib/schemas";

type Id = string | number;
export type ItemBody = yup.InferType<typeof itemSchema> & { active: boolean };

export const itemService = {
  list: (params?: Record<string, unknown>) => api.get<Item[]>(API_PATHS.items.list, { params }),
  create: (body: ItemBody) => api.post<Item>(API_PATHS.items.create, body),
  detail: (id: Id) => api.get<Item>(API_PATHS.items.detail(id)),
  update: (id: Id, body: ItemBody) => api.put<Item>(API_PATHS.items.update(id), body),
  delete: (id: Id) => api.patch<void>(API_PATHS.items.delete(id)),
};
