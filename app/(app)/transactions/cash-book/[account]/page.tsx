import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { selectTransfers } from "@/models/transfer";

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
    const transfers = (await selectTransfers()).map((t) => ({
      activeAccount: account || undefined,
      ...t,
    }));
  
    const payments = [...transactions, ...transfers].sort((a,b) => a.date < b.date ? 1 : -1);
      
  return <DataTable columns={columns} data={payments} />;
};

export default TransactionsPage;
