import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation"

export const selectTransactions = async () => {
  const organisation = await selectCurrentOrganisation();

  const transactions = await db.query.transactionsTable.findMany({
    where: (fields, {eq}) => eq(fields.organisationId, organisation.id),
    with: {
      category: {
        columns: {name: true, id: true, account: true},
      },
      subCategory: {
        columns: {name: true, id: true}
      }
    }
  });

  return transactions;
}