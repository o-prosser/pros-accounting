import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export const metadata: Metadata = { title: "Transactions" };

export const runtime = "edge";

const TransactionsPage = async ({
  params,
}: {
  params: { account: string };
}) => {
  const account =
    params.account === "club"
      ? "club"
      : params.account === "charity"
      ? "charity"
      : null;

  const transactions = await selectTransactions({ account });

  return <DataTable columns={columns} data={transactions} />;
};

export default TransactionsPage;
