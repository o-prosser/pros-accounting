import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation"
import { cache } from "react";

export const selectTransactions = cache(async (params: {account: "club"|"charity"|null}|undefined) => {
  const organisation = await selectCurrentOrganisation();

  const transactions = await db.query.transactionsTable.findMany({
    where: (fields, {eq}) => eq(fields.organisationId, organisation.id),
    orderBy: (fields, {desc}) => desc(fields.date),
    with: {
      category: {
        columns: {name: true, id: true, account: true, colour: true},
      },
      subCategory: {
        columns: {name: true, id: true}
      }
    }
  });

  return params?.account ? transactions.filter(t => t.category.account === params.account): transactions;
});