import { DataTable } from "@/components/data-table";
import { selectTransfers } from "@/models/transfer"
import { columns } from "./columns";

const TransfersIndex = async () => {
  const transfers = await selectTransfers();

  return <DataTable columns={columns} data={transfers} searchable={false} />
}

export default TransfersIndex;