import { Caption, Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeftRightIcon,
  BanknoteIcon,
  CalendarIcon,
  ChevronDownIcon,
  PlusIcon,
  SlashIcon,
  TableIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { use } from "react";

export const metadata: Metadata = { title: "Transactions" };

export const runtime = "edge";

const TransactionsIndexLayout = ({
  params,
  children,
}: {
  params: Promise<{ account: string }>;
  children: React.ReactNode;
}) => {
  const {account: accountParam} = use(params);

  const account =
    accountParam === "club"
      ? "club"
      : accountParam === "charity"
      ? "charity"
      : accountParam === "dutch"
      ? "dutch"
      : null;

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Cash book</BreadcrumbItem>
          {account ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="capitalize">{account}</BreadcrumbItem>
            </>
          ) : (
            ""
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between">
        <div>
          <Title className="mb-0 flex items-center">
            Cash book{" "}
            {account ? (
              <>
                <SlashIcon className="text-muted-foreground h-6 w-6 mx-2" />{" "}
                <span className="capitalize">{account}</span>
              </>
            ) : (
              ""
            )}
          </Title>
          <Caption className="mb-6">
            Search and sort the log of your transactions.
          </Caption>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Select view
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/transactions/cash-book/${accountParam}`}>
                  <TableIcon className="h-4 w-4 text-muted-foreground mr-2" />
                  Table
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/transactions/cash-book/${
                    accountParam
                  }/calendar?date=${format(new Date(), "yyyy-MM-dd")}`}
                >
                  <CalendarIcon className="h-4 w-4 text-muted-foreground mr-2" />
                  Calendar
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <PlusIcon />
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/transactions/create${
                    accountParam ? `?account=${accountParam}` : ""
                  }`}
                >
                  <BanknoteIcon className="h-4 w-4 text-muted-foreground mr-2" />
                  Add transaction
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/transfers/create${
                    accountParam ? `?account=${accountParam}` : ""
                  }`}
                >
                  <ArrowLeftRightIcon className="h-4 w-4 text-muted-foreground mr-2" />
                  Add transfer
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {children}
    </>
  );
};

export default TransactionsIndexLayout;
