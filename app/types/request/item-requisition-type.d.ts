export interface SelectOption {
  value: string;
  label: string;
}

export interface CreateItemRequisitionType {
  partNo: SelectOption | null;
  productName: string;
  process: SelectOption | null;
  backflush: string;
  productDrawingNo: string;
  revisionNo: string;
  customer: SelectOption | null;
  rawMaterial: string;
  trialNo: string;
  testDate: string;
  testingReason: string;
  mouldNo: string;
  equipmentNo: string;
  cavityNo: string;
  mcName: string;
  articleSample: string;
  toolroomSample: string;
  customerSample: string;
}
