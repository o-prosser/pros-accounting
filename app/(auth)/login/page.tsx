import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginAction } from "./actions";
import { Metadata } from "next";
import { Title } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Login" };

const LoginPage = () => {
  return (
    <>
      <Title className="mb-6 text-center">Login to your account</Title>

      <form action={loginAction} className="w-full">
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
          autoFocus
          className="mt-1 w-full mb-8"
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
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

export default LoginPage;