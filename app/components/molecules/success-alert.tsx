import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/app/components/atoms/alert";

export function SuccessAlert({ children }: { children: ReactNode }) {
  return (
    <Alert role="status">
      <CheckCircle2 />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
