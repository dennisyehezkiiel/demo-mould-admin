import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/app/components/atoms/button";

type Tone = "default" | "danger" | "success" | "warning" | "info";

// Button hover background per tone.
const TONES: Record<Tone, string> = {
  default: "",
  danger: "hover:bg-destructive/10",
  success: "hover:bg-success/10",
  warning: "hover:bg-warning/10",
  info: "hover:bg-info/10",
};

// Icon color per tone.
const ICON_COLORS: Record<Tone, string> = {
  default: "",
  danger: "text-destructive",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
};

// Renders a link when `href` is set, otherwise a button.
export function IconButton({
  icon: Icon,
  label,
  tone = "default",
  iconTone,
  href,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  tone?: Tone;
  /** Icon color; defaults to `tone`. */
  iconTone?: Tone;
  href?: string;
  onClick?: () => void;
}) {
  const cls = TONES[tone];
  const icon = <Icon className={ICON_COLORS[iconTone ?? tone]} />;
  
  return href ? (
    <Button asChild variant="ghost" size="icon-sm" className={cls}>
      <Link href={href} aria-label={label}>{icon}</Link>
    </Button>
  ) : (
    <Button type="button" variant="ghost" size="icon-sm" className={cls} onClick={onClick} aria-label={label}>
      {icon}
    </Button>
  );
}
