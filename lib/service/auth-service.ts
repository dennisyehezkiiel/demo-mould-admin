import type * as yup from "yup";
import { api } from "@/lib/api";
import { API_PATHS } from "@/lib/api-path";
import type { loginSchema } from "@/lib/schemas";

export type LoginBody = yup.InferType<typeof loginSchema>;

export const authService = {
  login: (body: LoginBody) => api.post<{ token: string }>(API_PATHS.auth.login, body),
};
