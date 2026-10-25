"use client";

import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { getErrorMessage } from "@/lib/error";

export function useNotifyError() {
  const { enqueueSnackbar } = useSnackbar();
  return useCallback(
    (err: unknown) => enqueueSnackbar(getErrorMessage(err), { variant: "error" }),
    [enqueueSnackbar],
  );
}
