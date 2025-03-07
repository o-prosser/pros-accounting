import { Metadata } from "next";
import { Title } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/form-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { forgotPasswordAction } from "./actions";

export const metadata: Metadata = { title: "Forgot Password" };

const ForgotPasswordPage = () => {
  return (
    <>
      <Title className="mb-6 sm:mx-auto">Forgot your password?</Title>

      <form action={forgotPasswordAction} className="w-full">
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

        <FormButton type="submit" className="w-full">
          Send reset code
        </FormButton>
      </form>

      <p className="text-sm text-muted-foreground pt-12 sm:pt-6 sm:text-center">
        <Button asChild variant="link" size={null}>
          <Link href="/login">Return to login page</Link>
        </Button>
      </p>
    </>
  );
};

export default ForgotPasswordPage;
