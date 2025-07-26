import { PaymentFilterableDataTable } from "@/components/payment-filterable-data-table";
import { selectCategories } from "@/models/category";
import { getPaymentsForTable } from "@/utils/transactions";
import { columns } from "./columns";
import SummaryWidget from "./_components/summary-widget";
import CheckSidepanelVisible from "./_components/check-sidepanel-visible";
import { selectCurrentOrganisation } from "@/models/organisation";

const CashbookPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const awaitedSearchParams = await searchParams;

  const accountParam = awaitedSearchParams.account as string | undefined;
  const account =
    accountParam === "club" || accountParam === "charity" ? accountParam : null;

  const categories = await selectCategories();
  const organisation = await selectCurrentOrganisation();
  const balancedTransfersPayments = await getPaymentsForTable({ account });

  const financialYearId = awaitedSearchParams.fy as string | undefined;
  const currentFinancialYear = financialYearId
    ? organisation.financialYears.find((fy) => fy.id === financialYearId)
    : organisation.financialYears.find((fy) => fy.isCurrent === true);

  return (
    <>
      {account ? (
        <SummaryWidget account={account} viewButton={false} chart={false} />
      ) : (
        ""
      )}
      <CheckSidepanelVisible>
        <PaymentFilterableDataTable
          columns={columns}
          data={balancedTransfersPayments
            .reverse()
            .filter((p) =>
              currentFinancialYear
                ? p.financialYearId === currentFinancialYear.id
                : true,
            )}
          categories={categories}
          financialYears={organisation.financialYears}
          currentFinancialYear={currentFinancialYear}
          // @ts-ignore
          categoryKey="categoryId"
        />
      </CheckSidepanelVisible>
    </>
  );
};

export default CashbookPage;
