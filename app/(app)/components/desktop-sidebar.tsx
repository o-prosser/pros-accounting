import ActivePage from "@/components/active-page";
import Logo from "@/components/ui/logo";
import DesktopLink from "./desktop-link";
import {
  BanknoteIcon,
  ChevronDownIcon,
  FileTextIcon,
  HelpCircleIcon,
  HomeIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  TagIcon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../_components/theme-toggle";
import { clearSession, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { sessionsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const DesktopSidebar = ({
  organisation,
  user,
}: {
  organisation: { name: string };
  user: { firstName: string; lastName: string | null };
}) => {
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
    <div className="hidden md:flex fixed z-10 left-4 inset-y-4 bg-muted w-80 py-6 px-3 gap-y-2 flex-col items-start rounded-2xl">
      <Logo className="h-6 pl-3 w-auto mb-4 fill-foreground" />

      <ActivePage pathname="/dashboard" match="eq">
        <DesktopLink href="/dashboard">
          <HomeIcon />
          Dashboard
        </DesktopLink>
      </ActivePage>
      <ActivePage pathname="/transactions/cash-book/all">
        <DesktopLink href="/transactions/cash-book/all">
          <BanknoteIcon />
          Cash book
        </DesktopLink>
      </ActivePage>
      <div className="ml-[1.375rem] border-l pl-[1.125rem] flex flex-col items-stretch [&>a]:justify-start [&>a]:pl-0">
        <ActivePage pathname="/transactions/cash-book/charity">
          <Button variant={null} asChild>
            <Link href="/transactions/cash-book/charity">Charity</Link>
          </Button>
        </ActivePage>
        <ActivePage pathname="/transactions/cash-book/club">
          <Button variant={null} asChild>
            <Link href="/transactions/cash-book/club">Club</Link>
          </Button>
        </ActivePage>
      </div>
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

      <Button asChild variant="outline" className="w-full mb-2">
        <Link href="/transactions/create"><PlusIcon /> Add transaction</Link>
      </Button>

      <div className="flex items-center w-full">
        <div className="h-12 w-12 bg-background rounded-full overflow-hidden flex justify-center items-center">
          <User className="fill-zinc-400 text-zinc-400 h-11 w-11 -mb-[15px] inline-block" />
        </div>
        <div className="flex flex-col items-start -gap-2 pl-2 flex-1 w-full">
          <span className="text-sm text-muted-foreground">
            {organisation.name}
          </span>
          <span className="font-medium">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2">
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuGroup>
              <ModeToggle />
              <DropdownMenuItem asChild className="w-full">
                <Link href='/user-guidance-v1.pdf' download target="_blank">
                <HelpCircleIcon className="text-muted-foreground mr-2 h-4 w-4" />
                  Help
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <form action={logout} className="w-full">
                <DropdownMenuItem asChild className="w-full">
                  <button type="submit">
                    <LogOutIcon className="text-muted-foreground mr-2 h-4 w-4" />
                    Log out
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DesktopSidebar;
