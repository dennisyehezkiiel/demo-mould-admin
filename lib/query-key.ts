export const queryKey = {
  items: {
    list: (params?: unknown) => ["items", "list", params],
    detail: (id: string) => [id]
  },
  process: {
    list: ['process', 'list'],
  },
  customer: {
    list: ['customer', 'list']
  },
  testingReason: {
    list: ['reason', 'list']
  },
  testingRequisition: {
    list: ['requisition', 'list']
  },
  product: {
    list: ['product', 'list']
  }
};