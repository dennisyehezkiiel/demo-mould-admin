"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/app/components/atoms/button";
import { Input } from "@/app/components/atoms/input";
import { Field } from "@/app/components/molecules/field";
import { FormHeading } from "@/app/components/molecules/form-heading";
import { registerSchema } from "@/lib/schemas";
import Paths from "@/lib/route-paths";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });

  function onSubmit() {
    setLoading(true);
    setTimeout(() => router.push(Paths.auth.login), 600);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormHeading title="Create account" subtitle="Start managing your inventory" />
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
      <p className="text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link href={Paths.auth.login} className="font-medium text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
