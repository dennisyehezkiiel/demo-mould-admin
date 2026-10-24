import { Button } from "@/app/components/atoms/button";
import { cn } from "@/lib/utils";

export function FormActions({ onCancel, className }: { onCancel: () => void; className?: string }) {
  return (
    <div className={cn("flex justify-end gap-2", className)}>
      <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      <Button type="submit">Save</Button>
    </div>
  );
}
