import { Suspense } from "react";
import { Shell } from "@/components/shell";
import { StoreProvider } from "@/lib/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Suspense>
        <Shell>{children}</Shell>
      </Suspense>
    </StoreProvider>
  );
}
