import { PaymentFilterableDataTable } from "@/components/payment-filterable-data-table";
import { selectCategories } from "@/models/category";
import { getPaymentsForTable } from "@/utils/transactions";
import { columns } from "./columns";
import SummaryWidget from "./_components/summary-widget";
import CheckSidepanelVisible from "./_components/check-sidepanel-visible";

const CashbookPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const accountParam = (await searchParams).account as string | undefined;
  const account =
    accountParam === "club" || accountParam === "charity" ? accountParam : null;

  const categories = await selectCategories();
  const balancedTransfersPayments = await getPaymentsForTable({ account });

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
          data={balancedTransfersPayments.reverse()}
          categories={categories}
          // @ts-ignore
          categoryKey="categoryId"
        />
      </CheckSidepanelVisible>
    </>
  );
};

export default CashbookPage;
