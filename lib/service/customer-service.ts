import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../query-key";
import { api } from "../api";
import { API_PATHS } from "../api-path";
import { CustomerResponse } from "@/app/types/response/customer-response";

export const useGetCustomerList = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKey.customer.list,
    queryFn: (): Promise<CustomerResponse[]> => api.get<CustomerResponse[]>(API_PATHS.customer.list, { params }),
  });
}