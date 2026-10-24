import { ChevronsLeft, ChevronsRight, Layers, Package } from "lucide-react";
import { Button } from "@/app/components/atoms/button";
import { Logo } from "@/app/components/atoms/logo";
import { NavLink } from "@/app/components/molecules/nav-link";

const nav = [
  { href: "/dashboard/items", label: "Items", icon: Package },
  { href: "/dashboard/materials", label: "Materials", icon: Layers },
];

export function Sidebar({
  narrow,
  pathname,
  onNavigate,
  onToggle,
}: {
  narrow: boolean;
  pathname: string;
  onNavigate: () => void;
  onToggle: () => void;
}) {
  return (
    <aside className={`flex h-full flex-col border-r bg-card ${narrow ? "w-16" : "w-64"} transition-[width]`}>
      <Logo collapsed={narrow} className="h-16 px-4" />
      <nav className="flex-1 space-y-1 p-2">
        {nav.map((n) => (
          <NavLink key={n.href} {...n} active={pathname.startsWith(n.href)} narrow={narrow} onClick={onNavigate} />
        ))}
      </nav>
      <Button
        variant="ghost"
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="m-2 hidden h-10 justify-start gap-3 px-3 text-muted-foreground lg:flex"
      >
        {narrow ? <ChevronsRight className="size-5" /> : <><ChevronsLeft className="size-5" /> Collapse</>}
      </Button>
    </aside>
  );
}
