import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { selectTransfers } from "@/models/transfer";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { selectCurrentOrganisation } from "@/models/organisation";
import { SelectTransaction, SelectTransfer } from "@/drizzle/schema";
import { columnsWithoutAccount } from "./columnsWithoutAccount";
import SummaryWidget from "./_components/summary-widget";
import { PaymentFilterableDataTable } from "@/components/payment-filterable-data-table";
import { selectCategories } from "@/models/category";
import { getPaymentsForTable } from "@/utils/transactions";

export const metadata: Metadata = { title: "Transactions" };

export const runtime = "edge";

const TransactionsPage = async (props: {
  params: Promise<{ account: string }>;
}) => {
  const params = await props.params;

  const account =
    params.account === "club"
      ? "club"
      : params.account === "charity"
      ? "charity"
      : params.account === "dutch"
      ? "dutch"
      : null;

  const categories = await selectCategories();
  const balancedTransfersPayments = await getPaymentsForTable({ account });

  return (
    <>
      {account ? (
        <SummaryWidget account={account} viewButton={false} chart={false} />
      ) : (
        ""
      )}
      <PaymentFilterableDataTable
        columns={account ? columnsWithoutAccount : columns}
        data={balancedTransfersPayments.reverse()}
        categories={categories}
        // @ts-ignore
        categoryKey="categoryId"
      />
    </>
  );
};

export default TransactionsPage;
