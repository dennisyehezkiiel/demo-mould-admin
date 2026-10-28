import { SelectOption } from "../select-option";

export interface CreateItemRequisitionType {
  partNo: SelectOption | null;
  productName: string;
  process: SelectOption | null;
  backflush: string;
  productDrawingNo: string;
  revisionNo: number;
  customer: SelectOption | null;
  rawMaterial: string;
  trialNo: string;
  testDate: Date | null;
  testingReason: SelectOption | null;
  mouldNo: string;
  equipmentNo: string;
  cavityNo: string;
  mcName: string;
  inspectionSample: number;
  toolroomSample: number;
  clientSample: number;
  productId: string
}

export interface RequestItemRequisitionType {
  customerId: string;
  productId: string;
  trialNo: string;
  testDate: Date;
  testingReasonId: string;
  mcName: string;
  inspectionSample: number;
  toolroomSample: number;
  clientSample: number;
}
