import { getSession } from "@/lib/auth"
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const selectCurrentOrganisation = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const id = session?.user.organisationId

  if (id === null) redirect("/setup");

  const organisation = await db.query.organisationsTable.findFirst({
    where: (fields, {eq}) => eq(fields.id, id),
  });

  if (!organisation) redirect("/setup");

  return organisation
}