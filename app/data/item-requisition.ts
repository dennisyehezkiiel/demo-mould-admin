import type { CreateItemRequisitionType } from "@/app/types/request/item-requisition-type";
import { SelectOption } from "../types/select-option";

export const createItemRequisitionData: CreateItemRequisitionType = {
  partNo: null,
  productName: "",
  process: null,
  backflush: "",
  productDrawingNo: "",
  revisionNo: 0,
  customer: null,
  rawMaterial: "",
  trialNo: "",
  testDate: "",
  testingReason: "",
  mouldNo: "",
  equipmentNo: "",
  cavityNo: "",
  mcName: "",
  articleSample: "",
  toolroomSample: "",
  customerSample: "",
};

// ponytail: static placeholder options, swap for API data when endpoints exist
export const partNoOptions: SelectOption[] = [
  { value: "PN-001", label: "PN-001" },
  { value: "PN-002", label: "PN-002" },
];

export const processOptions: SelectOption[] = [
  { value: "injection", label: "Injection Moulding" },
  { value: "assembly", label: "Assembly" },
];

export const customerOptions: SelectOption[] = [
  { value: "starkey", label: "Starkey" },
  { value: "other", label: "Other" },
];
