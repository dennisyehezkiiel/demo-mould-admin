import type * as yup from "yup";
import type { loginSchema } from "@/lib/schemas";

export type LoginRequest = yup.InferType<typeof loginSchema>;