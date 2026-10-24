import type { ReactNode } from "react";
import { Card, CardContent } from "@/app/components/atoms/card";
import { Logo } from "@/app/components/atoms/logo";

export function AuthTemplate({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Logo className="mb-6 justify-center text-xl" />
        <Card>
          <CardContent className="p-2 sm:p-4">{children}</CardContent>
        </Card>
      </div>
    </main>
  );
}
