import { CustomerResponse } from "./customer-response";
import { ProductResponse } from "./product-response";
import { TestingReasonResponse } from "./testing-reason-response";

export interface TestingRequisitionListResponse {
  id: string;
  customerId: string;
  productId: string;
  trialNo: number,
  testDate: Date;
  testingReasonId: string;
  mcName: string;
  inspectionSample: number;
  toolroomSample: number;
  clientSample: number
  customer: CustomerResponse,
  product: ProductResponse
  testingReason: TestingReasonResponse
}

export interface TestingRequisitionDetailResponse {
  id: string;
  trialNo: number;
  revisionNo: number;
  rawMaterial: string;
  testDate: Date;
  mcName: string;
  inspectionSample: number;
  toolroomSample: number;
  clientSample: number;
  customer: CustomerResponse;
  product: ProductResponse;
  testingReason: TestingReasonResponse;
  backFlush: string;
}