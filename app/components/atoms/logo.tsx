import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ collapsed, className }: { collapsed?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-semibold", className)}>
      <Boxes className="size-7 shrink-0 text-primary" />
      {!collapsed && <span>Mould Admin</span>}
    </div>
  );
}
