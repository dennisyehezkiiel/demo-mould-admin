import type { ReactNode } from "react";

export function DetailGrid({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className={k === "Description" ? "col-span-2" : undefined}>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k}</dt>
          <dd className="mt-0.5 text-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
