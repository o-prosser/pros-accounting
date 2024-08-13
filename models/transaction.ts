import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation";
import { cache } from "react";
import { transactionsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const selectTransactions = cache(
  async (params: { account: "club" | "charity" | null } | undefined) => {
    const organisation = await selectCurrentOrganisation();

    const transactions = await db.query.transactionsTable.findMany({
      where: (fields, { eq, and }) =>
        and(
          eq(fields.organisationId, organisation.id),
          params?.account ? eq(fields.account, params.account) : undefined,
        ),
      orderBy: (fields, { desc }) => desc(fields.date),
      with: {
        category: {
          columns: { name: true, id: true, account: true, colour: true },
        },
        subCategory: {
          columns: { name: true, id: true },
        },
      },
    });

    // Temporary migration script to move category
    transactions.forEach(async (transaction) => {
      if (!transaction.account) {
        await db
          .update(transactionsTable)
          .set({
            account: transaction.category.account,
          })
          .where(eq(transactionsTable.id, transaction.id));
      }
    });

    // return params?.account
    //   ? transactions.filter((t) => t.category.account === params.account)
    //   : transactions;

    return transactions;
  },
);
