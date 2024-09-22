import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation";
import { cache } from "react";

export const selectTransfers = cache(async (params?: {account?: "club"|"charity"|"dutch"|null}) => {
  const organisation = await selectCurrentOrganisation();

  const transfers = await db.query.transfersTable.findMany({
    where: (fields, { eq, and, or }) => and(eq(fields.organisationId, organisation.id), params?.account ? or(eq(fields.from, params?.account), eq(fields.to, params?.account)): undefined),
    orderBy: (fields, { desc }) => desc(fields.date),
  });

  return transfers;
});
