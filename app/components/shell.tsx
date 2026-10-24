"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Boxes, ChevronDown, ChevronsLeft, ChevronsRight, LogOut, Menu, Package, Layers } from "lucide-react";

const nav = [
  { href: "/dashboard/items", label: "Items", icon: Package },
  { href: "/dashboard/materials", label: "Materials", icon: Layers },
];

// ponytail: hardcoded user. Read from session once real auth exists.
const user = { name: "John Doe", role: "Administrator", initials: "JD" };

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState(false);

  const crumbs = pathname.split("/").filter(Boolean);

  const sidebar = (narrow: boolean) => (
    <aside className={`flex h-full flex-col border-r border-slate-200 bg-white ${narrow ? "w-16" : "w-64"} transition-[width]`}>
      <div className="flex h-16 items-center gap-2 px-4 font-semibold">
        <Boxes className="size-7 shrink-0 text-indigo-600" />
        {!narrow && <span>Mould Admin</span>}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawer(false)}
              title={label}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium ${
                active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="size-5 shrink-0" />
              {!narrow && label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
        className="m-2 hidden h-10 items-center gap-3 rounded-lg px-3 text-sm text-slate-500 hover:bg-slate-100 lg:flex"
      >
        {collapsed ? <ChevronsRight className="size-5" /> : <><ChevronsLeft className="size-5" /> Collapse</>}
      </button>
    </aside>
  );

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">{sidebar(collapsed)}</div>

      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setDrawer(false)} />
          <div className="relative h-full w-64">{sidebar(false)}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawer(true)} aria-label="Open menu" className="rounded-md p-2 hover:bg-slate-100 lg:hidden">
              <Menu className="size-5" />
            </button>
            <nav aria-label="Breadcrumb" className="hidden text-sm text-slate-500 sm:block">
              {crumbs.map((c, i) => (
                <span key={i} className={i === crumbs.length - 1 ? "font-medium text-slate-900" : undefined}>
                  {i > 0 && " / "}
                  <span className="capitalize">{c}</span>
                </span>
              ))}
            </nav>
          </div>

          <div className="relative">
            <button onClick={() => setMenu(!menu)} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-100">
              <span className="flex size-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {user.initials}
              </span>
              <span className="hidden text-left text-sm leading-tight sm:block">
                <span className="block font-medium">{user.name}</span>
                <span className="block text-xs text-slate-500">{user.role}</span>
              </span>
              <ChevronDown className="size-4 text-slate-500" />
            </button>
            {menu && (
              <>
                <div className="fixed inset-0" onClick={() => setMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role}</p>
                  </div>
                  <button
                    onClick={() => router.push("/login")}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="size-4" /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
