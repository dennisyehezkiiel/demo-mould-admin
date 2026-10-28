import { RequestItemRequisitionType } from "@/app/types/request/item-requisition"
import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { API_PATHS } from "../api-path"

export const useCreateTestingRequisition = () => {
  return useMutation({
    mutationFn: (request: RequestItemRequisitionType): Promise<any> => api.post(API_PATHS.testingRequisition.create, request)
  })
}