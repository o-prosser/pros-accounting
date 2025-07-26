import { Caption, Heading, Title } from "@/components/ui/typography";
import { format, isPast } from "date-fns";
import { Metadata } from "next";
import Transactions from "./_components";
import TotalsLoading from "./_components/totals-loading";
import { Suspense } from "react";
import TransactionsLoading from "./_components/index-loading";
import { getSession } from "@/lib/auth";
import SummaryWidget from "@/components/summary-widget";
import {
  HomeIcon,
  DownloadIcon,
  PlusIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectCurrentOrganisation } from "@/models/organisation";
import LoadingIndicator from "@/components/loading-indicator";
// import { seed } from "../transactions/cash-book/[account]/seed";

export const metadata: Metadata = { title: "Dashboard" };

// export const runtime = "edge";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const session = await getSession();

  const organisation = await selectCurrentOrganisation();

  const awaitedSearchParams = await searchParams;
  const financialYearId = awaitedSearchParams.fy as string | undefined;

  const currentFinancialYear = financialYearId
    ? organisation.financialYears.find((fy) => fy.id === financialYearId)
    : organisation.financialYears.find((fy) => fy.isCurrent === true);

  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <Title icon={HomeIcon}>Welcome back, {session?.user.firstName}</Title>
          <Caption className="-mt-4">
            It&apos;s {format(new Date(), "EEEE, do MMMM yyyy")} &mdash;
            here&apos;s an overview of your accounts.
          </Caption>
        </div>
        {organisation.financialYears.filter((fy) => fy.isCurrent === true)
          .length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {format(
                  currentFinancialYear?.startDate || new Date(),
                  "MMM yyyy",
                )}{" "}
                &mdash;{" "}
                {isPast(currentFinancialYear?.endDate || new Date())
                  ? format(
                      currentFinancialYear?.endDate || new Date(),
                      "MMM yyyy",
                    )
                  : "present"}
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Financial years</DropdownMenuLabel>
              <DropdownMenuGroup>
                {organisation.financialYears.map((fy, key) => (
                  <DropdownMenuItem asChild key={key}>
                    <Link href={`/dashboard?fy=${fy.id}`}>
                      <div className="size-1.5 bg-popover-foreground/80 rounded-full mr-2"></div>
                      {format(fy.startDate, "d MMMM yyyy")} &ndash;{" "}
                      {format(fy.endDate, "d MMMM yyyy")}
                      <LoadingIndicator />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          ""
        )}
      </div>

      <Suspense fallback={<TotalsLoading />}>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <SummaryWidget
            account="charity"
            currentFinancialYear={currentFinancialYear}
          />
          <SummaryWidget
            account="club"
            currentFinancialYear={currentFinancialYear}
          />
          {/* <SummaryWidget
            account="dutch"
            className="md:col-span-2"
            chart={false}
          /> */}
        </div>
      </Suspense>

      <div className="grid grid-cols-5 gap-6 mt-6">
        <div className="rounded-2xl border bg-muted/50 p-3 col-span-2">
          <h3 className="font-medium text-xl flex-1">Quick actions</h3>

          <Button className="mt-2 w-full" asChild variant="dark">
            <Link href="/cashbook/create">
              <PlusIcon className="!size-4" />
              Add a payment
            </Link>
          </Button>
          <Button
            className="bg-background p-3 mt-2 text-sm border whitespace-normal items-end hover:underline hover:bg-background/50 w-full relative overflow-hidden"
            asChild
            variant={null}
            size={null}
          >
            <Link href="">
              <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-bl from-transparent via-background via-70% to-background"></div>
              <span className="w-full whitespace-normal relative">
                Download this month&apos;s transactions and transfers in a
                printable report.
              </span>
              <DownloadIcon className="size-4 text-muted-foreground relative" />
            </Link>
          </Button>
          <Button
            className="bg-background p-3 mt-2 text-sm border whitespace-normal items-end hover:underline hover:bg-background/50 w-full relative overflow-hidden"
            asChild
            variant={null}
            size={null}
          >
            <Link href="">
              <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-background via-70% to-background"></div>
              <span className="w-full whitespace-normal relative">
                Export all transactions and transfers in an Excel spreadsheet
                format.
              </span>
              <DownloadIcon className="size-4 text-muted-foreground relative" />
            </Link>
          </Button>
          <Button
            className="bg-background p-3 mt-2 text-sm border whitespace-normal items-end hover:underline hover:bg-background/50 w-full relative overflow-hidden"
            asChild
            variant={null}
            size={null}
          >
            <Link href="">
              <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-background via-70% to-background"></div>
              <span className="w-full whitespace-normal relative">
                Generate a monthly account summary for either your charity or
                club account.
              </span>
              <DownloadIcon className="size-4 text-muted-foreground relative" />
            </Link>
          </Button>
        </div>
        <div className="border rounded-2xl bg-muted/50 p-3 col-span-3">
          <div className="flex items-start">
            <h3 className="font-medium text-xl flex-1">Categories</h3>
            <Button size="sm" variant="outline" asChild>
              <Link href="">
                <PlusIcon />
                Add category
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-t-2xl p-3 pb-9 border-x border-t mt-6 -mb-6">
        <h3 className="font-medium text-xl flex-1">Latest payments</h3>
      </div>

      <Suspense fallback={<TransactionsLoading />}>
        <Transactions financialYear={currentFinancialYear} />
      </Suspense>

      {/* <form action={seed}>
        <Button>Run</Button>
      </form> */}
    </>
  );
};

export default DashboardPage;
