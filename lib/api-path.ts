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
} as const;
