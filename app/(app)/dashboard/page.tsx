import { Caption, Title } from "@/components/ui/typography";
import { format } from "date-fns";
import { Metadata } from "next";
import Transactions from "./_components";
import TotalsLoading from "./_components/totals-loading";
import { Suspense } from "react";
import TransactionsLoading from "./_components/index-loading";
import { HomeIcon } from "lucide-react";
import { selectCurrentOrganisation } from "@/models/organisation";
import {
  DashboardGreeting,
  DashboardGreetingLoading,
} from "./_components/greeting";
import DashboardCategoriesWidget, {
  DashboardCategoriesWidgetLoading,
} from "./_components/categories";
import DashboardQuickLinksWidget from "./_components/quick-links";
import dynamic from "next/dynamic";

const DashboardFinancialYearPicker = dynamic(
  () => import("./_components/financial-year-picker"),
);

const SummaryWidget = dynamic(() => import("@/components/summary-widget"));

export const metadata: Metadata = { title: "Dashboard" };

// export const runtime = "edge";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const organisation = await selectCurrentOrganisation();

  const awaitedSearchParams = await searchParams;
  const financialYearId = awaitedSearchParams.fy as string | undefined;

  const currentFinancialYear = financialYearId
    ? organisation.financialYears.find((fy) => fy.id === financialYearId)
    : organisation.financialYears.find((fy) => fy.isCurrent === true);

  return (
    <>
      <div className="flex flex-col sm:!flex-row gap-2 justify-between sm:items-end">
        <div>
          <Title icon={HomeIcon}>
            <Suspense fallback={<DashboardGreetingLoading />}>
              <DashboardGreeting />
            </Suspense>
          </Title>
          <Caption className="-mt-4">
            It&apos;s {format(new Date(), "EEEE, do MMMM yyyy")} &mdash;
            here&apos;s an overview of your accounts.
          </Caption>
        </div>
        <DashboardFinancialYearPicker financialYear={currentFinancialYear} />
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
        </div>
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        <DashboardQuickLinksWidget />
        <Suspense fallback={<DashboardCategoriesWidgetLoading />}>
          <DashboardCategoriesWidget />
        </Suspense>
      </div>

      <div className="rounded-t-2xl p-3 pb-9 border-x border-t mt-6 -mb-6">
        <h3 className="font-medium text-xl flex-1">Latest payments</h3>
      </div>

      <Suspense fallback={<TransactionsLoading />}>
        <Transactions financialYear={currentFinancialYear} />
      </Suspense>
    </>
  );
};

export default DashboardPage;
