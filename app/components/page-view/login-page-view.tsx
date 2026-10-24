"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input } from "@/app/components/ui";
import { loginSchema } from "@/lib/schemas";

export function LoginPageView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

  function onSubmit() {
    setLoading(true);
    // ponytail: fake auth, any credentials pass. Replace with real session call.
    setTimeout(() => router.push("/dashboard/items"), 600);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-sm text-slate-500">Sign in to your account</p>
      </div>
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <Input type="password" {...register("password")} placeholder="••••••••" autoComplete="current-password" />
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
