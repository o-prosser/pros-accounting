import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation";
import { cache } from "react";
import { transactionsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { selectTransfers } from "./transfer";
import { isBefore, isSameDay } from "date-fns";

export const selectTransactions = cache(
  async (params: { account: "club" | "charity" | null } | undefined) => {
    const organisation = await selectCurrentOrganisation();

    const transactions = await db.query.transactionsTable.findMany({
      where: (fields, { eq, and }) =>
        and(
          eq(fields.organisationId, organisation.id),
          params?.account ? eq(fields.account, params.account) : undefined,
        ),
      orderBy: (fields, { desc, asc }) => [desc(fields.date), asc(fields.receiptBookNumber), asc(fields.name)],
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
    // transactions.forEach(async (transaction) => {
    //   if (!transaction.account) {
    //     await db
    //       .update(transactionsTable)
    //       .set({
    //         account: transaction.category.account,
    //       })
    //       .where(eq(transactionsTable.id, transaction.id));
    //   }
    // });

    const transfers = await selectTransfers();

    // Add balance to each transaction
    const transactionsWithBalance = transactions.map((transaction, idx) => {
      const total = transactions.filter((t) => t.account === transaction.account).map((t) => t.income ? t.income : `-${t.expense}`).slice(idx).reduce((total, current) => total + parseFloat(current || ""), 0);
      const transfersTotal = transfers
        .filter((t) =>
          isSameDay(t.date, transaction.date)
            ? (t.notes || "") < transaction.name
            : isBefore(t.date, transaction.date),
        )
        .map(t => t.from === transaction.account ? `-${t.amount}` : t.amount)
        .reduce((total, current) => total + parseFloat(current || ""), 0);

        console.log(
          total +
            transfersTotal +
            (parseFloat(
              transaction.account === "club"
                ? organisation.initialClubBalance || ""
                : organisation.initialCharityBalance || "",
            ) || 0),
        );

      return {
        balance:
          total +
          transfersTotal +
          parseFloat(
            transaction.account === "club"
              ? organisation.initialClubBalance || ""
              : organisation.initialCharityBalance || "",
          ),
        ...transaction,
      };
    })    

    // return params?.account
    //   ? transactions.filter((t) => t.category.account === params.account)
    //   : transactions;

    return transactionsWithBalance;
  },
);
