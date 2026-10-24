import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/app/components/atoms/button";

export function NavLink({
  href,
  label,
  icon: Icon,
  active,
  narrow,
  onClick,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  narrow: boolean;
  onClick: () => void;
}) {
  return (
    <Button asChild variant={active ? "secondary" : "ghost"} className="h-10 w-full justify-start gap-3 px-3">
      <Link href={href} onClick={onClick} title={label} aria-current={active ? "page" : undefined}>
        <Icon className="size-5 shrink-0" />
        {!narrow && label}
      </Link>
    </Button>
  );
}
