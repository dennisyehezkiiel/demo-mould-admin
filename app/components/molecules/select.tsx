import type { ComponentProps } from "react";
import { NativeSelect } from "@/app/components/atoms/native-select";

export function Select({
  options,
  placeholder,
  ...p
}: Omit<ComponentProps<"select">, "size"> & { options: string[]; placeholder: string }) {
  return (
    <NativeSelect className="w-full" {...p}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </NativeSelect>
  );
}
