import { AuthTemplate } from "@/app/components/templates/auth-template";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
