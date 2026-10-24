import { Label } from "@/app/components/atoms/label";
import { Switch } from "@/app/components/atoms/switch";

export function SwitchField({
  checked,
  onChange,
  onLabel = "Active",
  offLabel = "Inactive",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}) {
  return (
    <div className="flex items-end pb-1">
      <Label className="gap-3">
        <Switch checked={checked} onCheckedChange={onChange} />
        {checked ? onLabel : offLabel}
      </Label>
    </div>
  );
}
