import { Caption, Title } from "@/components/ui/typography";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircleIcon, PlusIcon, SlashIcon } from "lucide-react";
import TransactionsIndex from "./_components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Transactions" };

export const runtime = "edge";

const TransactionsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const account =
    searchParams.account === "club"
      ? "club"
      : searchParams.account === "charity"
      ? "charity"
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
                <SlashIcon className="text-muted-foreground h-6 w-6 mx-2" /> <span className="capitalize">{account}</span>
              </>
            ) : (
              ""
            )}
          </Title>
          <Caption className="mb-6">
            Search and sort the log of your transactions.
          </Caption>
        </div>
        <Button asChild>
          <Link href="/transactions/create">
            <PlusIcon />
            <span className="hidden sm:inline">Add transaction</span>
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[80vh]">
            <LoaderCircleIcon className="h-5 w-5 animate-spin" />
            <span className="font-medium text-sm">Loading transactions...</span>
          </div>
        }
      >
        <TransactionsIndex account={account} />
      </Suspense>
    </>
  );
};

export default TransactionsPage;
