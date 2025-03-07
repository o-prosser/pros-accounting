import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerAction } from "./actions";
import { Metadata } from "next";
import { Title } from "@/components/ui/typography";
import { FormButton } from "@/components/form-button";

export const metadata: Metadata = { title: "Register" };

const RegisterPage = () => {
  return (
    <>
      <Title className="sm:mx-auto mb-6">Create your account</Title>

      <form action={registerAction} className="w-full">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          autoFocus
          className="mt-1 w-full mb-6"
        />

        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full mb-6"
        />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          className="mt-1 w-full mb-8"
        />

        <FormButton type="submit" className="w-full">
          Register
        </FormButton>
      </form>

      <p className="text-sm text-muted-foreground pt-12 sm:pt-6 sm:text-center">
        Already registered?{" "}
        <Button asChild variant="link" size={null}>
          <Link href="/login">Login</Link>
        </Button>
      </p>
    </>
  );
}

export default RegisterPage;