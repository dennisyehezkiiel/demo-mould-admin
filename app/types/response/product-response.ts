import { ProcessResponse } from "./process-response";

export interface ProductResponse {
  id: string;
  productNo: string;
  productName: string;
  processId: string;
  productDrawingNumber: string;
  mouldNo: string;
  equipmentNo: string;
  cavityNo: string;
  process: ProcessResponse
}