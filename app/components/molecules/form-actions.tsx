import { Button } from "@/app/components/atoms/button";
import { cn } from "@/lib/utils";

export function FormActions({ onCancel, className, loading }: { onCancel: () => void; className?: string; loading?: boolean }) {
  return (
    <div className={cn("flex justify-end gap-2", className)}>
      <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      <Button type="submit" loading={loading}>Save</Button>
    </div>
  );
}
