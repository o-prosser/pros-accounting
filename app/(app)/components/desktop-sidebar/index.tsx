import ActivePage from "@/components/active-page";
import Logo from "@/components/ui/logo";
import DesktopLink from "../desktop-link";
import {
  HelpCircleIcon,
  LogOutIcon,
  PlusIcon,
  TagIcon,
  User,
  SearchIcon,
  ChevronsUpDownIcon,
  FileIcon,
  SettingsIcon,
  FolderIcon,
  LucideLandmark,
  ExternalLinkIcon,
  UserIcon,
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
import { ModeToggle } from "../../_components/theme-toggle";
import Link from "next/link";
import { logout } from "../../actions";
import { HomeIcon } from "@/components/icons/home";
import { Suspense } from "react";
import DekstopSidebarOrganisationName from "./organisation-name";
import DekstopSidebarUserDetail from "./user-details";

const DesktopSidebar = () => {
  return (
    <div className="hidden md:!flex fixed z-10 left-4 inset-y-4 w-70 gap-y-0.5 flex-col items-start p-3 overflow-auto">
      <Logo className="h-6 w-auto mb-2 fill-foreground shrink-0" />

      <div className="h-[2px] bg-background border-t w-full" />

      <div className="flex w-full gap-2 mb-2 mt-1">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="dark:border-background/80 dark:bg-background/70 dark:hover:bg-background/30"
        >
          <Link href="/cashbook/create">
            <PlusIcon />
          </Link>
        </Button>
        <Button
          variant="outline"
          className="flex-1 dark:border-background/80 dark:bg-background/70 dark:hover:bg-background/30"
        >
          <SearchIcon className="!size-4" />
          <span className="flex-1 text-left">Search</span>
          <div className="flex gap-px">
            <div className="text-xs size-4 grid place-items-center bg-muted rounded">
              ⌘
            </div>
            <div className="text-xs size-4 grid place-items-center bg-muted rounded">
              K
            </div>
          </div>
        </Button>
      </div>

      <span className="text-xs font-medium uppercase text-muted-foreground">
        <Suspense fallback={"Loading"}>
          <DekstopSidebarOrganisationName />
        </Suspense>
      </span>

      <div className="h-[2px] bg-background border-t w-full" />

      {/* <div className="flex w-full gap-2 mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="flex-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-muted border border-primary"
            >
              <PlusIcon />
              <span className="flex-1 text-left pl-2">Add payment</span>
              <ChevronDownIcon className="!h-3 !w-3 !text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/transactions/create">
                <BanknoteIcon className="h-4 w-4 text-muted-foreground mr-2" />
                Add transaction
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/transfers/create">
                <ArrowLeftRightIcon className="h-4 w-4 text-muted-foreground mr-2" />
                Add transfer
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
         <Button size="icon" variant="outline" className="h-9 w-9">
          <SearchIcon />
        </Button>
      </div> */}

      <ActivePage pathname="/dashboard" match="eq">
        <DesktopLink href="/dashboard">
          <HomeIcon />
          Dashboard
        </DesktopLink>
      </ActivePage>
      <ActivePage pathname="/reports">
        <DesktopLink href="/reports">
          <FileIcon />
          Reports
        </DesktopLink>
      </ActivePage>
      <ActivePage pathname="/categories">
        <DesktopLink href="/categories">
          <TagIcon />
          Categories
        </DesktopLink>
      </ActivePage>
      <ActivePage pathname="/documents">
        <DesktopLink href="/documents">
          <FolderIcon />
          Documents
        </DesktopLink>
      </ActivePage>

      <span className="text-xs font-medium uppercase text-muted-foreground pt-3">
        Cash book
      </span>

      <div className="h-[2px] bg-background border-t w-full" />

      <div className="gap-y-1 flex flex-col items-start mb-2 w-full">
        <ActivePage pathname="/cashbook">
          <DesktopLink href="/cashbook">
            <div className="size-4.5 rounded-full border border-border from-foreground/10 to-foreground/10 via-foreground/50 bg-gradient-to-br"></div>
            All payments
          </DesktopLink>
        </ActivePage>
        <ActivePage
          match="searchParam"
          pathname="/cashbook"
          searchParamName="account"
          searchParamContent="charity"
        >
          <DesktopLink href="/cashbook?account=charity">
            <div className="size-4.5 rounded-full border border-orange-600 bg-gradient-to-br via-orange-600 from-orange-400 to-orange-400"></div>
            Charity
          </DesktopLink>
        </ActivePage>
        <ActivePage
          match="searchParam"
          pathname="/cashbook"
          searchParamName="account"
          searchParamContent="club"
        >
          <DesktopLink href="/cashbook?account=club">
            <div className="size-4.5 rounded-full border border-cyan-600 bg-gradient-to-br via-cyan-600 from-cyan-400 to-cyan-400"></div>
            Club
          </DesktopLink>
        </ActivePage>
      </div>

      <span className="text-xs font-medium uppercase text-muted-foreground pt-3">
        Links
      </span>

      <div className="h-[2px] bg-background border-t w-full" />

      <Button
        asChild
        variant="ghost"
        className="hover:bg-muted-foreground/20 w-full justify-start px-3 data-[active=true]:bg-muted-foreground/20 [[data-active='true']_&>svg]:!text-foreground [&>svg]:size-4.5"
      >
        <a
          href="https://www.lloydsbank.com/business/home.html#flyout"
          target="_blank"
        >
          <LucideLandmark />
          <span className="flex-1 text-left">Lloyds Bank</span>
          <ExternalLinkIcon className="size-3" />
        </a>
      </Button>

      <span className="text-xs font-medium uppercase text-muted-foreground pt-3">
        Settings
      </span>

      <div className="h-[2px] bg-background border-t w-full" />

      {/* <ActivePage pathname="/transfers">
        <DesktopLink href="/transfers">
          <ArrowRightLeftIcon />
          Transfers
        </DesktopLink>
      </ActivePage> */}
      <ActivePage pathname="/settings" match="eq">
        <DesktopLink href="/settings">
          <SettingsIcon />
          Configuration
        </DesktopLink>
      </ActivePage>
      {/* <ActivePage pathname="/help" match="eq">
        <DesktopLink href="/help">
          <HelpCircleIcon />
          Help
        </DesktopLink>
      </ActivePage> */}

      <div className="flex-1" />

      <div className="flex items-center w-full bg-background border rounded-lg px-3 py-2">
        <div className="h-8 w-8 bg-muted/50 border rounded-full overflow-hidden flex justify-center items-center">
          <User className="fill-zinc-300 text-zinc-300 h-10 w-10 -mb-[10px] inline-block" />
        </div>
        <div className="flex flex-col items-start text-sm -gap-2 pl-3 flex-1 w-full">
          <Suspense fallback={"Loading"}>
            <DekstopSidebarUserDetail />
          </Suspense>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="-mr-2">
              <ChevronsUpDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44" align="start">
            <DropdownMenuGroup>
              <ModeToggle />
              <DropdownMenuItem asChild className="w-full">
                <Link href="/profile">
                  <UserIcon className="text-muted-foreground mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
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
