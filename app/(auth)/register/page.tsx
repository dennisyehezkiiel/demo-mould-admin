"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input } from "@/components/ui";
import { registerSchema } from "@/lib/schemas";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });

  function onSubmit() {
    setLoading(true);
    setTimeout(() => router.push("/login"), 600);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="text-sm text-slate-500">Start managing your inventory</p>
      </div>
      <Field label="Full name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="John Doe" autoComplete="name" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <Input type="password" {...register("password")} autoComplete="new-password" />
      </Field>
      <Field label="Confirm password" error={errors.confirm?.message}>
        <Input type="password" {...register("confirm")} autoComplete="new-password" />
      </Field>
      <Button type="submit" loading={loading} className="w-full">Create account</Button>
      <p className="text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
