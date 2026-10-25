import { api } from "@/lib/api";
import { API_PATHS } from "@/lib/api-path";
import { LoginRequest } from "@/app/types/auth-type";
import { AuthResponse } from "@/app/types/response/auth";

export const authService = {
  login: (body: LoginRequest) => api.post<AuthResponse>(API_PATHS.auth.login, body),
};
