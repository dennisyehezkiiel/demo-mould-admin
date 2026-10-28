import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../query-key";
import { api } from "../api";
import { API_PATHS } from "../api-path";
import { TestingReasonResponse } from "@/app/types/response/testing-reason-response";

export const useGetTestingReasonList = () => {
  return useQuery({
    queryKey: queryKey.testingReason.list,
    queryFn: (): Promise<TestingReasonResponse[]> => api.get<TestingReasonResponse[]>(API_PATHS.testingReason.list),
  });
}