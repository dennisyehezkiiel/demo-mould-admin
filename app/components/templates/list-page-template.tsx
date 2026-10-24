import Link from "next/link";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/app/components/atoms/button";
import { PageHeader } from "@/app/components/molecules/page-header";
import { SearchInput } from "@/app/components/molecules/search-input";

export function ListPageTemplate({
  title,
  placeholder,
  query,
  onQuery,
  addHref,
  addLabel,
  children,
}: {
  title: string;
  placeholder: string;
  query: string;
  onQuery: (q: string) => void;
  addHref: string;
  addLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SearchInput
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={`Search ${title.toLowerCase()}`}
        />
        <Button asChild>
          <Link href={addHref}><Plus /> {addLabel}</Link>
        </Button>
      </div>
      {children}
    </>
  );
}
