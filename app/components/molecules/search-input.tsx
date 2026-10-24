import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { Input } from "@/app/components/atoms/input";

export function SearchInput(p: ComponentProps<"input">) {
  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input {...p} className="pl-9" />
    </div>
  );
}
