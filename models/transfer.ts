import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation";

export const selectTransfers=  async () => {
  const organisation = await selectCurrentOrganisation();

  const transfers = await db.query.transfersTable.findMany({
    where: (fields, {eq}) => eq(fields.organisationId, organisation.id),
    orderBy: (fields, {desc}) => desc(fields.date),
  });

  return transfers;
}