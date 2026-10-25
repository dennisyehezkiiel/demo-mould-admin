import { isAxiosError } from "axios";

export function getErrorMessage(err: unknown) {
  if (isAxiosError(err)) return err.response?.data?.message ?? err.message;
  return err instanceof Error ? err.message : "Something went wrong";
}
