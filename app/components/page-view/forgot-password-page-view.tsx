"use client";

import Link from "next/link";
import { useState } from "react";
import { FormHeading } from "@/app/components/molecules/form-heading";
import { SuccessAlert } from "@/app/components/molecules/success-alert";
import { ForgotPasswordForm } from "@/app/components/organisms/forgot-password-form";

export function ForgotPasswordPageView() {
  const [sentTo, setSentTo] = useState("");

  return (
    <div className="space-y-4">
      <FormHeading title="Forgot password?" subtitle="We will email you a reset link" />
      {sentTo ? (
        <SuccessAlert>Reset link sent to <strong>{sentTo}</strong>. Check your inbox.</SuccessAlert>
      ) : (
        <ForgotPasswordForm onSent={setSentTo} />
      )}
      <p className="text-center text-sm">
        <Link href="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
      </p>
    </div>
  );
}
