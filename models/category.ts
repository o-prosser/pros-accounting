import db from "@/lib/db"
import { selectCurrentOrganisation } from "./organisation"

export const selectCategory = async (id: string) => {
  const organisation = await selectCurrentOrganisation();

  const category = await db.query.categoriesTable.findFirst({
    where: (fields, {eq, and}) => and(eq(fields.id, id), eq(fields.organisationId, organisation.id)),
    with: {
      transactions: true,
    }
  });

  return category;
}

export const selectCategories = async () => {
  const organisation = await selectCurrentOrganisation();

  const categories = await db.query.categoriesTable.findMany({
    where: (fields, {eq}) => eq(fields.organisationId, organisation.id),
    with: {
      subCategories: true,
      transactions: true,
    }
  })

  return categories;
}