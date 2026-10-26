import type * as yup from "yup";
import { api } from "@/lib/api";
import { API_PATHS } from "@/lib/api-path";
import type { Item } from "@/lib/data";
import type { itemSchema } from "@/lib/schemas";
import { ItemDetailResponse } from "@/app/types/response/item-response";
import { useQuery } from '@tanstack/react-query';
import { queryKey } from "../query-key";

type Id = string | number;
export type ItemBody = yup.InferType<typeof itemSchema>;

export const itemService = {
  list: (params?: Record<string, unknown>) => api.get<Item[]>(API_PATHS.items.list, { params }),
  create: (body: ItemBody) => api.post<Item>(API_PATHS.items.create, body),
  detail: (id: Id) => api.get<ItemDetailResponse>(API_PATHS.items.detail(id)),
  update: (id: Id, body: ItemBody) => api.put<Item>(API_PATHS.items.update(id), body),
  delete: (id: Id) => api.patch<void>(API_PATHS.items.delete(id)),
};

export const useGetItemList = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKey.items.list,
    queryFn: (): Promise<Item[]> => api.get<Item[]>(API_PATHS.items.list, { params }),
  });
}