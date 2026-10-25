import { api } from "@/lib/api";
import { API_PATHS } from "@/lib/api-path";
import { LoginRequest } from "@/app/types/auth-type";

export const authService = {
  login: (body: LoginRequest) => api.post<{ token: string }>(API_PATHS.auth.login, body),
};
