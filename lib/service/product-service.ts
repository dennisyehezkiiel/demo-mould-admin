import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../query-key";
import { api } from "../api";
import { API_PATHS } from "../api-path";
import { ProductResponse } from "@/app/types/response/product-response";

export const useGetProductList = (params?: { customerId: string | null; processId: string | null }) => {
  return useQuery({
    queryKey: queryKey.product.list,
    queryFn: (): Promise<ProductResponse[]> => api.get<ProductResponse[]>(API_PATHS.product.list, { params }),
    enabled: !!(params?.customerId && params.processId)
  });
}