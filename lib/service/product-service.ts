import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../query-key";
import { api } from "../api";
import { API_PATHS } from "../api-path";
import { ProductResponse } from "@/app/types/response/product-response";

export const useGetProductList = (params?: { customer: string | null; process: string | null }) => {
  return useQuery({
    queryKey: queryKey.product.list,
    queryFn: (): Promise<ProductResponse[]> => api.get<ProductResponse[]>(API_PATHS.product.list, { params }),
  });
}