"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/app/components/atoms/sheet";
import { Sidebar } from "@/app/components/organisms/sidebar";
import { Topbar } from "@/app/components/organisms/topbar";

export function DashboardTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const crumbs = pathname.split("/").filter(Boolean);
  const sidebar = (narrow: boolean) => (
    <Sidebar narrow={narrow} pathname={pathname} onNavigate={() => setDrawer(false)} onToggle={() => setCollapsed(!collapsed)} />
  );

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">{sidebar(collapsed)}</div>

      <Sheet open={drawer} onOpenChange={setDrawer}>
        <SheetContent side="left" className="w-64 p-0 lg:hidden" aria-describedby={undefined}>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          {sidebar(false)}
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar crumbs={crumbs} onOpenMenu={() => setDrawer(true)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
