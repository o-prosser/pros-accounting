import ActivePage from "@/components/active-page";
import Logo from "@/components/ui/logo";
import DesktopLink from "./desktop-link";
import {
  ArrowRightLeftIcon,
  BanknoteIcon,
  ChevronDownIcon,
  FileTextIcon,
  HelpCircleIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  TagIcon,
  User,
  HomeIcon,
  SearchIcon,
  FileBarChartIcon,
  ChevronsUpDownIcon
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
import { logout } from "../actions";

const DesktopSidebar = ({
  organisation,
  user,
}: {
  organisation: { name: string };
  user: { firstName: string; lastName: string | null, email: string };
}) => {
  return (
    <div className="hidden md:flex fixed z-10 left-4 inset-y-4 bg-muted w-80 py-6 px-3 gap-y-2 flex-col items-start rounded-2xl">
      <Logo className="h-6 pl-3 w-auto mb-4 fill-foreground" />

      <div className="flex w-full gap-2 mb-2">
        <Button
          asChild
          className="flex-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-muted [&>svg]:mr-2 border border-primary"
          size="sm"
        >
          <Link href="/transactions/create">
            <PlusIcon /> Add new
          </Link>
        </Button>
        <Button size="icon" variant="outline" className="h-9 w-9">
          <SearchIcon />
        </Button>
      </div>

      <ActivePage pathname="/dashboard" match="eq">
        <DesktopLink href="/dashboard">
          <HomeIcon />
          Home
        </DesktopLink>
      </ActivePage>
      <ActivePage pathname="/reports">
        <DesktopLink href="/reports">
          <FileBarChartIcon />
          Reporting
        </DesktopLink>
      </ActivePage>

      <label htmlFor="" className="text-sm font-semibold pl-3 pt-4">
        Cash book
      </label>
      <div className="gap-y-1 flex flex-col items-start mb-2 w-full">
        <ActivePage pathname="/transactions/cash-book/all">
          <DesktopLink href="/transactions/cash-book/all">
            <div className="h-5 w-5 rounded-full border border-border to-foreground/10 from-foreground/50 bg-gradient-to-b"></div>
            All payments
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/transactions/cash-book/charity">
          <DesktopLink href="/transactions/cash-book/charity">
            <div className="h-5 w-5 rounded-full border border-orange-600 to-orange-600/10 from-orange-600/50 bg-gradient-to-b"></div>
            Charity
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/transactions/cash-book/club">
          <DesktopLink href="/transactions/cash-book/club">
            <div className="h-5 w-5 rounded-full border border-cyan-600 to-cyan-600/10 from-cyan-600/50 bg-gradient-to-b"></div>
            Club
          </DesktopLink>
        </ActivePage>
        <ActivePage pathname="/transactions/cash-book/dutch">
          <DesktopLink href="/transactions/cash-book/dutch">
            <div className="h-5 w-5 rounded-full border border-green-600 to-green-600/10 from-green-600/50 bg-gradient-to-b"></div>
            Dutch visit
          </DesktopLink>
        </ActivePage>
      </div>

      <ActivePage pathname="/categories">
        <DesktopLink href="/categories">
          <TagIcon />
          Categories
        </DesktopLink>
      </ActivePage>
      {/* <ActivePage pathname="/transfers">
        <DesktopLink href="/transfers">
          <ArrowRightLeftIcon />
          Transfers
        </DesktopLink>
      </ActivePage> */}
      <ActivePage pathname="/settings" match="eq">
        <DesktopLink href="/settings">
          <SettingsIcon />
          Settings
        </DesktopLink>
      </ActivePage>
      <ActivePage pathname="/help" match="eq">
        <DesktopLink href="/help">
          <HelpCircleIcon />
          Help
        </DesktopLink>
      </ActivePage>

      <div className="flex-1" />

      <div className="flex items-center w-full">
        <div className="h-9 w-9 bg-background rounded-full overflow-hidden flex justify-center items-center">
          <User className="fill-zinc-300 text-zinc-300 h-10 w-10 -mb-[15px] inline-block" />
        </div>
        <div className="flex flex-col items-start text-sm -gap-2 pl-3 flex-1 w-full">
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2">
              <ChevronsUpDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuGroup>
              <ModeToggle />
              <DropdownMenuItem asChild className="w-full">
                <Link href="/user-guidance-v1.pdf" download target="_blank">
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
