"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useActionState, useRef } from "react";
import { resetPasswordAction } from "./actions";
import { FormButton } from "@/components/form-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ResetPasswordForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(resetPasswordAction, {valid: false, email: "", token: ""});

  return (
    <form action={formAction} ref={formRef} className={state?.valid ? "w-full" :"flex justify-center"}>
      {state?.valid ? (
        <>
          <input type="hidden" name="email" defaultValue={state.email} />
          <input type="hidden" name="_form" defaultValue="password" />

          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required autoFocus className="mt-1 w-full mb-8" />

          <FormButton type="submit" className="w-full">Reset password</FormButton>
        </>
      ) : (
        <>
          <input type="hidden" name="_form" defaultValue="token" />

          <InputOTP name="token" maxLength={6} onComplete={() => formRef.current?.requestSubmit()}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </>
      )}
    </form>
  );
}

export default ResetPasswordForm