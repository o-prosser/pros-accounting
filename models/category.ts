import db from "@/lib/db";
import { selectCurrentOrganisation } from "./organisation";
import { cache } from "react";
import { getTotal } from "@/utils/totals";

export const selectCategory = cache(async (id: string) => {
  const organisation = await selectCurrentOrganisation();

  const category = await db.query.categoriesTable.findFirst({
    where: (fields, { eq, and }) =>
      and(eq(fields.id, id), eq(fields.organisationId, organisation.id)),
    with: {
      transactions: {
        orderBy: (fields, { desc }) => desc(fields.date),
      },
      transfers: {
        orderBy: (fields, { desc }) => desc(fields.date),
      },
    },
  });

  if (!category) return;

  const paymentNumber =
    category.transactions.length + category.transfers.length;

  const income = getTotal({
    type: "income",
    transactions: category.transactions,
    transfers: [],
  });
  const expense = getTotal({
    type: "expense",
    transactions: category.transactions,
    transfers: [],
  });

  return {
    totals: { paymentNumber, income, expense },
    ...category,
  };
});

export const selectCategories = async (
  args:
    | {
        financialYear?: { id: string };
      }
    | undefined,
) => {
  const organisation = await selectCurrentOrganisation();

  const categories = await db.query.categoriesTable.findMany({
    where: (fields, { eq, and }) =>
      and(
        eq(fields.organisationId, organisation.id),
        args?.financialYear &&
          eq(fields.financialYearId, args.financialYear.id),
      ),
    orderBy: (fields, { asc }) => asc(fields.name),
    with: {
      subCategories: true,
      transactions: {
        orderBy: (fields, { desc }) => desc(fields.date),
      },
      transfers: {
        orderBy: (fields, { desc }) => desc(fields.date),
      },
    },
  });

  return categories.map((category) => {
    const lastUpdated = category?.transactions[0]
      ? category?.transactions[0].createdAt
      : new Date();

    const paymentNumber =
      category.transactions.length + category.transfers.length;

    const income = getTotal({
      type: "income",
      transactions: category.transactions,
      transfers: [],
    });
    const expense = getTotal({
      type: "expense",
      transactions: category.transactions,
      transfers: [],
    });

    return {
      lastUpdated,
      totals: { paymentNumber, income, expense },
      ...category,
    };
  });
};

export const selectCategoriesMin = async () => {
  const organisation = await selectCurrentOrganisation();

  const categories = await db.query.categoriesTable.findMany({
    where: (fields, { eq }) => eq(fields.organisationId, organisation.id),
    columns: {
      id: true,
      name: true,
      account: true,
      financialYearId: true,
    },
    with: {
      subCategories: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  return categories;
};
