import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/app/components/atoms/button";
import { cn } from "@/lib/utils";

// Renders a link when `href` is set, otherwise a button.
export function IconButton({
  icon: Icon,
  label,
  tone = "default",
  href,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  tone?: "default" | "danger";
  href?: string;
  onClick?: () => void;
}) {
  const cls = cn(tone === "danger" && "text-destructive hover:bg-destructive/10 hover:text-destructive");
  return href ? (
    <Button asChild variant="ghost" size="icon-sm" className={cls}>
      <Link href={href} aria-label={label}><Icon /></Link>
    </Button>
  ) : (
    <Button type="button" variant="ghost" size="icon-sm" className={cls} onClick={onClick} aria-label={label}>
      <Icon />
    </Button>
  );
}
