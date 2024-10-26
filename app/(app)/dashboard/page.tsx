import { Caption, Heading, Title } from "@/components/ui/typography";
import { format } from "date-fns";
import { Metadata } from "next";
import Totals from "./_components/totals";
import Transactions from "./_components";
import TotalsLoading from "./_components/totals-loading";
import { Suspense } from "react";
import TransactionsLoading from "./_components/index-loading";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Dashboard" };

// export const runtime = "edge";

const DashboardPage = async () => {
  const session = await getSession();

  return (
    <>
      <Caption>{format(new Date(), "EEEE, do MMMM yyyy")}</Caption>
      <Title>Welcome back, {session?.user.firstName}</Title>

      <Suspense fallback={<TotalsLoading />}>
        <Totals />
      </Suspense>

      <Heading className="mt-6 mb-2">Latest transactions</Heading>
        <Suspense fallback={<TransactionsLoading />}>
          <Transactions />
        </Suspense>
    </>
  );
};

export default DashboardPage;
