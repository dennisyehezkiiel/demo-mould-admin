import { Menu } from "lucide-react";
import { Button } from "@/app/components/atoms/button";
import { Breadcrumb } from "@/app/components/molecules/breadcrumb";
import { UserMenu } from "@/app/components/organisms/user-menu";

export function Topbar({ crumbs, onOpenMenu }: { crumbs: string[]; onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onOpenMenu} aria-label="Open menu" className="lg:hidden">
          <Menu />
        </Button>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <UserMenu />
    </header>
  );
}
