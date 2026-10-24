import type { ReactNode } from "react";
import { Label } from "@/app/components/atoms/label";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Label className={cn("flex-col items-stretch gap-1.5", className)}>
      {label}
      {children}
      {error && <span className="text-xs font-normal text-destructive">{error}</span>}
    </Label>
  );
}
