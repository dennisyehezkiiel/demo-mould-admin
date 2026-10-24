"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Field, Input } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (String(f.get("password")).length < 8) errs.password = "At least 8 characters";
    if (f.get("password") !== f.get("confirm")) errs.confirm = "Passwords do not match";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => router.push("/login"), 600);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="text-sm text-slate-500">Start managing your inventory</p>
      </div>
      <Field label="Full name">
        <Input name="name" required placeholder="John Doe" autoComplete="name" />
      </Field>
      <Field label="Email">
        <Input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field label="Password" error={errors.password}>
        <Input name="password" type="password" required autoComplete="new-password" />
      </Field>
      <Field label="Confirm password" error={errors.confirm}>
        <Input name="confirm" type="password" required autoComplete="new-password" />
      </Field>
      <Button type="submit" loading={loading} className="w-full">Create account</Button>
      <p className="text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
