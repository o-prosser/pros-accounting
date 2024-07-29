import { DataTable } from "@/components/data-table";
import { selectTransactions } from "@/models/transaction"
import { columns } from "./table";


const Transactions = async () => {
  const transactions = await selectTransactions({account: null});

  return (
    <DataTable searchable={false} columns={columns} data={transactions.slice(0,4)} />
  )
}

export default Transactions