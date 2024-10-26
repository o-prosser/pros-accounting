import { DataTable } from "@/components/data-table";
import { selectTransactions } from "@/models/transaction";
import { columns } from "./table";
import { selectTransfers } from "@/models/transfer";
import { isAfter } from "date-fns";

const Transactions = async () => {
  const transactions = await selectTransactions({ account: null });
  const transfers = await selectTransfers();

  const payments = [...transactions, ...transfers].sort((a, b) =>
    isAfter(a.date, b.date) ? -1 : 1,
  );

  return (
    <DataTable
      searchable={false}
      columns={columns}
      data={payments.slice(0, 8)}
    />
  );
};

export default Transactions;
