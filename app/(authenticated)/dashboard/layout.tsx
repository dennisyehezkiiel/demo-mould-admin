import { Suspense } from "react";
import { DashboardTemplate } from "@/app/components/templates/dashboard-template";
import { StoreProvider } from "@/lib/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Suspense>
        <DashboardTemplate>{children}</DashboardTemplate>
      </Suspense>
    </StoreProvider>
  );
}
