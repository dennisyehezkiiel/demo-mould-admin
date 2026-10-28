type Id = string | number;

export const API_PATHS = {
  auth: {
    login: "/auth/login",
  },
  items: {
    list: "/items",
    create: "/items",
    detail: (id: Id) => `/items/${id}`,
    update: (id: Id) => `/items/${id}`,
    delete: (id: Id) => `/items/${id}`,
  },
  testingRequisition: {
    list: '/testing-requisition',
    create: '/testing-requisitions'
  },
  process: {
    list: '/processes'
  },
  customer: {
    list: '/customers'
  },
  testingReason: {
    list: '/testing-reasons'
  },
  product: {
    list: '/products'
  }
} as const;
