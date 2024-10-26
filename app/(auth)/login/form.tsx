"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginAction } from "./actions";
import { ErrorMessage, Title } from "@/components/ui/typography";
import { FormButton } from "@/components/form-button";
import { useActionState } from "react";

const initialState = {
  errors: {
    email: []
  }
}

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <>
      <Title className="mb-6 text-center">Login to your account</Title>

      <form action={formAction} className="w-full">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          className="mt-1 w-full mb-6"
        />
        {state.errors.email?.length || 0 > 0 ? <ErrorMessage className="-mt-4 mb-4">{state.errors.email?.join(", ")}</ErrorMessage> : ""}

        <div className="flex justify-between items-end">
          <Label htmlFor="password">Password</Label>
          <Button asChild variant="link" size={null}>
            <Link href="/forgot-password">Forgot password?</Link>
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          className="mt-1 w-full mb-8"
        />

        <FormButton type="submit" className="w-full">
          Login
        </FormButton>
      </form>

      <p className="text-sm text-muted-foreground pt-6 text-center">
        No account?{" "}
        <Button asChild variant="link" size={null}>
          <Link href="/register">Register now</Link>
        </Button>
      </p>
    </>
  );
};

export default LoginForm;