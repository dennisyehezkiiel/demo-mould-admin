"use client";

import { SnackbarProvider } from "notistack";
import type { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        {children}
      </SnackbarProvider>
    </CookiesProvider>
  );
}
