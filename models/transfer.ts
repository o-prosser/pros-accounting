import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation";
import { cache } from "react";

export const selectTransfers = cache(async (params?: {account?: "club"|"charity"|"dutch"|null}) => {
  const organisation = await selectCurrentOrganisation();

  const transfers = await db.query.transfersTable.findMany({
    where: (fields, {and,or,eq}) => and(eq(fields.organisationId, organisation.id), params?.account ? or(eq(fields.from, params?.account), eq(fields.to, params?.account)): undefined),
    orderBy: (fields, { desc }) => desc(fields.date),
    with: {
      category: true
    }
  });

  return transfers;
});

export const selectTransfer = cache(
  async (params: { id: string }) => {
    const organisation = await selectCurrentOrganisation();

    const transfer = await db.query.transfersTable.findFirst({
      where: (fields, { and, eq }) =>
        and(
          eq(fields.organisationId, organisation.id),
          eq(fields.id, params.id)
        ),
    });

    return transfer;
  },
);
