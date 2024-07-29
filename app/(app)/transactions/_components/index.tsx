import { DataTable } from "@/components/data-table";
import { selectTransactions } from "@/models/transaction"
import { columns } from "./table";


const TransactionsIndex = async ({account}: {account: "club"|"charity"|null}) => {
  const transactions = await selectTransactions({account});

  return (
    <DataTable columns={columns} data={transactions} />
  )
}

export default TransactionsIndex