import { Suspense } from "react";
import { Shell } from "@/app/components/shell";
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
