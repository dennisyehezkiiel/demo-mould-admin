"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Field, Input } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // ponytail: fake auth, any credentials pass. Replace with real session call.
    setTimeout(() => router.push("/dashboard/items"), 600);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-sm text-slate-500">Sign in to your account</p>
      </div>
      <Field label="Email">
        <Input type="email" required placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field label="Password">
        <Input type="password" required placeholder="••••••••" autoComplete="current-password" />
      </Field>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="size-4 accent-indigo-600" /> Remember me
        </label>
        <Link href="/forgot-password" className="font-medium text-indigo-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" loading={loading} className="w-full">Sign in</Button>
      <p className="text-center text-sm text-slate-500">
        No account?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:underline">Register</Link>
      </p>
    </form>
  );
}
