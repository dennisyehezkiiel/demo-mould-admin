"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/app/components/atoms/button";
import { Checkbox } from "@/app/components/atoms/checkbox";
import { Input } from "@/app/components/atoms/input";
import { Label } from "@/app/components/atoms/label";
import { Field } from "@/app/components/molecules/field";
import { FormHeading } from "@/app/components/molecules/form-heading";
import { loginSchema } from "@/lib/schemas";
import { authService } from "@/lib/service/auth-service";
import { LoginRequest } from "@/app/types/auth-type";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (value: LoginRequest) => {
    setLoading(true);
    try {
      const res = await authService.login(value);
    } catch (error) {
      console.log(error, ">>>cek error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormHeading title="Welcome back" subtitle="Sign in to your account" />
      <Field label="Email" error={errors.email?.message}>
        <Input
          type="email"
          {...register("email")}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <Input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </Field>
      <div className="flex items-center justify-between text-sm">
        <Label className="gap-2 font-normal text-muted-foreground">
          <Checkbox /> Remember me
        </Label>
        <Link
          href="/forgot-password"
          className="font-medium text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" loading={loading} className="w-full">
        Sign in
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
