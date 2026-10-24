export function Breadcrumb({ crumbs }: { crumbs: string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="hidden text-sm text-muted-foreground sm:block">
      {crumbs.map((c, i) => (
        <span key={i} className={i === crumbs.length - 1 ? "font-medium text-foreground" : undefined}>
          {i > 0 && " / "}
          <span className="capitalize">{c}</span>
        </span>
      ))}
    </nav>
  );
}
