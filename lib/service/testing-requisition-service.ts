import { RequestItemRequisitionType } from "@/app/types/request/item-requisition"
import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { API_PATHS } from "../api-path"
import { queryKey } from "../query-key"
import { TestingRequisitionListResponse } from "@/app/types/response/testing-requisition-response"
import { PaginationResponse } from "@/app/types/response/base-response"

export const useGetItemRequisitionList = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKey.items.list,
    queryFn: (): Promise<PaginationResponse<TestingRequisitionListResponse>> => api.get<PaginationResponse<TestingRequisitionListResponse>>(API_PATHS.testingRequisition.list, { params }),
  });
}

export const useCreateTestingRequisition = () => {
  return useMutation({
    mutationFn: (request: RequestItemRequisitionType) => api.post(API_PATHS.testingRequisition.create, request)
  })
}