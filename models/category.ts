import db from "@/lib/db"
import { selectCurrentOrganisation } from "./organisation"
import { cache } from "react";

export const selectCategory = cache(async (id: string) => {
  const organisation = await selectCurrentOrganisation();

  const category = await db.query.categoriesTable.findFirst({
    where: (fields, {eq, and}) => and(eq(fields.id, id), eq(fields.organisationId, organisation.id)),
    with: {
      subCategories: true,
      transactions: {
        with: {
          subCategory: true
        },
        orderBy: (fields, {desc}) => desc(fields.date),
      }
    }
  });

  return category;
})

export const selectCategories = async () => {
  const organisation = await selectCurrentOrganisation();

  const categories = await db.query.categoriesTable.findMany({
    where: (fields, {eq}) => eq(fields.organisationId, organisation.id),
    with: {
      subCategories: true,
      transactions: {
        orderBy: (fields, {desc}) => desc(fields.date),
      },
    },
  })

  return categories.map(category => {
    const lastUpdated = category?.transactions[0] ? category?.transactions[0].createdAt : new Date();

    return {lastUpdated, ...category}
  });
}

export const selectCategoriesMin = async () => {
  const organisation = await selectCurrentOrganisation();

  const categories = await db.query.categoriesTable.findMany({
    where: (fields, {eq}) => eq(fields.organisationId, organisation.id),
    columns: {
      id: true,
      name: true,
      account: true,
    },
    with: {
      subCategories: {
        columns: {
          id: true,
          name: true,
        }
      }
    } 
  })

  return categories;
}