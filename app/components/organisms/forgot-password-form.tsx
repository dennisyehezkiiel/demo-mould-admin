"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/app/components/atoms/button";
import { Input } from "@/app/components/atoms/input";
import { Field } from "@/app/components/molecules/field";
import { forgotSchema } from "@/lib/schemas";

export function ForgotPasswordForm({ onSent }: { onSent: (email: string) => void }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(forgotSchema) });

  function onSubmit({ email }: { email: string }) {
    setLoading(true);
    setTimeout(() => {
      onSent(email);
      setLoading(false);
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
    </form>
  );
}
