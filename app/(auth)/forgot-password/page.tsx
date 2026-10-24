"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, Field, Input } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email"));
    setLoading(true);
    setTimeout(() => {
      setSentTo(email);
      setLoading(false);
    }, 600);
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Forgot password?</h1>
        <p className="text-sm text-slate-500">We will email you a reset link</p>
      </div>
      {sentTo ? (
        <div role="status" className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="size-5 shrink-0" />
          <p>Reset link sent to <strong>{sentTo}</strong>. Check your inbox.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email">
            <Input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
          </Field>
          <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
        </form>
      )}
      <p className="text-center text-sm">
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">Back to sign in</Link>
      </p>
    </div>
  );
}
