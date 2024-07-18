import { DataTable } from "@/components/data-table";
import { selectTransactions } from "@/models/transaction"
import { columns } from "./table";


const TransactionsIndex = async () => {
  const transactions = await selectTransactions();

  return (
    <DataTable columns={columns} data={transactions} />
  )
}

export default TransactionsIndex