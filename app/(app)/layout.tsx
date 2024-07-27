import {
  BanknoteIcon,
  ChevronDownIcon,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  Moon,
  SettingsIcon,
  Sun,
  TagIcon,
  User,
} from "lucide-react";
import MobileLink from "./components/mobile-link";
import Logo from "@/components/ui/logo";
import DesktopLink from "./components/desktop-link";
import { clearSession, getSession } from "@/lib/auth";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./_components/theme-toggle";
import { Metadata } from "next";
import db from "@/lib/db";
import { sessionsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Toaster } from "@/components/ui/toaster";
import ActivePage from "@/components/active-page";

export const metadata: Metadata = {
  title: {
    default: "ProsAccounting",
    template: "%s – ProsAccounting",
  },
};

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const organisation = await selectCurrentOrganisation();

  if (!session || !organisation) redirect("/setup");

  const logout = async () => {
    "use server";

    const session = await getSession();
    if (!session) redirect("/login");

    // Remove cookie
    clearSession();

    // Set db entry to expire now so can't be used in future
    await db
      .update(sessionsTable)
      .set({
        expiresAt: new Date(),
      })
      .where(eq(sessionsTable.id, session.id));

    redirect("/login");
  };

  return (
    <>
      {/* Mobile */}
      <nav className="fixed bottom-6 inset-x-4 h-20 flex gap-6 justify-center items-center bg-muted rounded-2xl md:hidden">
        <MobileLink href="/dashboard">
          <HomeIcon />
        </MobileLink>
        <MobileLink href="/transactions">
          <BanknoteIcon />
        </MobileLink>
        <MobileLink href="/categories">
          <TagIcon />
        </MobileLink>
        <MobileLink href="/reports">
          <FileTextIcon />
        </MobileLink>
        <MobileLink href="/settings">
          <SettingsIcon />
        </MobileLink>
      </nav>

      {/* Desktop */}
      <div className="hidden md:flex fixed z-10 left-4 inset-y-4 bg-muted w-80 py-6 px-3 gap-y-2 flex-col items-start rounded-2xl">
        <Logo className="h-6 pl-3 w-auto mb-4 fill-foreground" />

        <ActivePage pathname="/dashboard" match="eq">
          <DesktopLink href="/dashboard">
            <HomeIcon />
            Dashboard
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/transactions">
          <DesktopLink href="/transactions">
            <BanknoteIcon />
            Cash book
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/categories">
          <DesktopLink href="/categories">
            <TagIcon />
            Categories
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/reports">
          <DesktopLink href="/reports">
            <FileTextIcon />
            Reports
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/settings" match="eq">
          <DesktopLink href="/settings">
            <SettingsIcon />
            Settings
          </DesktopLink>
        </ActivePage>

        <div className="flex-1" />

        <div className="flex items-center w-full">
          <div className="h-12 w-12 bg-background rounded-full overflow-hidden flex justify-center items-center">
            <User className="fill-zinc-400 text-zinc-400 h-11 w-11 -mb-3.5 inline-block" />
          </div>
          <div className="flex flex-col items-start -gap-2 pl-2 flex-1 w-full">
            <span className="text-sm text-muted-foreground">
              {organisation.name}
            </span>
            <span className="font-medium">
              {session.user.firstName} {session.user.lastName}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <ModeToggle />
              <form action={logout} className="w-full">
                <DropdownMenuItem asChild className="w-full">
                  <button type="submit">
                    <LogOutIcon className="text-muted-foreground mr-2 h-4 w-4" />
                    Log out
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 pt-6 pb-30 md:pb-6 min-h-screen md:pl-[22rem]">
        {children}
      </main>

      <Toaster />
    </>
  );
};

export default AppLayout;
