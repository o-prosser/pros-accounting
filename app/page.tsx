import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="h-[100dvh] overflow-hidden w-full flex flex-col justify-between px-8 md:px-12 lg:px-16 py-10 lg:pb-16">
      <div className="flex justify-end gap-4">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
      <div className="">
        <Logo className="h-10 fill-foreground w-auto" />
        <h1 className="font-[590] text-6xl tracking-tight mt-4">
          Your accounts, <br />
          made simple.
        </h1>
      </div>
    </div>
  );
}

export default LandingPage;