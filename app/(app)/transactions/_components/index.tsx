import { DataTable } from "@/components/data-table";
import { selectTransactions } from "@/models/transaction";
import { columns } from "../cash-book/[account]/columns";
import { selectTransfers } from "@/models/transfer";

const TransactionsIndex = async ({
  account,
}: {
  account: "club" | "charity" | null;
}) => {
  const transactions = await selectTransactions({ account });
  const transfers = (await selectTransfers()).map((t) => ({
      activeAccount: account || undefined,
      balance: 0,
      ...t,
  }));

  const payments = [...transactions, ...transfers].sort((a,b) => a.date < b.date ? -1 : 1);

  return <DataTable columns={columns} data={payments} />;
};

export default TransactionsIndex;
