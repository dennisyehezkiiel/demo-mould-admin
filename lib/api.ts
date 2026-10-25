import axios, { type AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { API_PATHS } from "@/lib/api-path";
import { TOKEN_COOKIE } from "@/lib/auth";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  // JS-readable cookie, needs a server-set httpOnly cookie to be XSS-safe
  const token = new Cookies().get(TOKEN_COOKIE);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    // a 401 from login itself means bad credentials, not an expired session
    const isLogin = err.config?.url === API_PATHS.auth.login;
    if (err.response?.status === 401 && !isLogin && typeof window !== "undefined") {
      new Cookies().remove(TOKEN_COOKIE, { path: "/" });
      window.location.replace("/login");
    }
    return Promise.reject(err);
  },
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    client.get<T>(url, config).then((r) => r.data),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.post<T>(url, data, config).then((r) => r.data),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.put<T>(url, data, config).then((r) => r.data),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.patch<T>(url, data, config).then((r) => r.data),
};
