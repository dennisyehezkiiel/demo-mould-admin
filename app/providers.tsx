"use client";

import { SnackbarProvider } from "notistack";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      {children}
    </SnackbarProvider>
  );
}
