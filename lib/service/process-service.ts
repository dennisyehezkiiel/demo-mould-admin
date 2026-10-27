import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../query-key";
import { ProcessResponse } from "@/app/types/response/process-response";
import { api } from "../api";
import { API_PATHS } from "../api-path";

export const useGetProcessList = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKey.process.list,
    queryFn: (): Promise<ProcessResponse[]> => api.get<ProcessResponse[]>(API_PATHS.process.list, { params }),
  });
}