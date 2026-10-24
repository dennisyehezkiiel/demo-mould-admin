import type { ReactNode } from "react";
import { PageHeader } from "@/app/components/molecules/page-header";

export function FormPageTemplate({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHeader title={title} />
      {children}
    </>
  );
}
