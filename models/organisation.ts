import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { cache } from "react";

export const selectCurrentOrganisation = cache(async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const id = session?.user.organisationId;

  if (id === null) redirect("/setup");

  const organisation = await db.query.organisationsTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
    with: {
      financialYears: {
        orderBy: (fields, { asc }) => asc(fields.startDate),
      },
    },
  });

  if (!organisation) redirect("/setup");

  return organisation;
});
