"use server";

import { transactionsTable, transfersTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  type: z.enum(["income", "expense", "transfer"], {
    message: "The payment type is required.",
  }),
  name: z
    .string()
    .min(3, { message: "The name must be at least 3 characters long." })
    .max(50, { message: "The name must be less than 50 characters long." }),
  date: z.string().max(100, { message: "The date provided was invalid." }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "The amount must be a valid number with up to two decimal places.",
  }),
  category: z
    .string()
    .length(36, { message: "You must add a category to the payment." }),
  account: z.enum(["charity", "club"], {
    message: "The account type is required.",
  }),
});

export const createPaymentAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      errors: z.prettifyError(fields.error),
    };
  }

  try {
    const organisation = await selectCurrentOrganisation();
    const currentFinancialYearId = organisation.financialYears.find(
      (year) => year.isCurrent,
    )?.id;

    if (fields.data.type === "transfer") {
      const transfer = await db
        .insert(transfersTable)
        .values({
          name: fields.data.name,
          date: new Date(fields.data.date),
          amount: parseFloat(fields.data.amount).toString(),
          categoryId: fields.data.category,
          from: fields.data.account,
          to: fields.data.account === "charity" ? "club" : "charity",
          financialYearId: currentFinancialYearId,
          organisationId: organisation.id,
        })
        .returning({ id: transfersTable.id });
    } else {
      const transaction = await db
        .insert(transactionsTable)
        .values({
          name: fields.data.name,
          date: new Date(fields.data.date),
          income:
            fields.data.type === "income"
              ? parseFloat(fields.data.amount).toString()
              : null,
          expense:
            fields.data.type === "expense"
              ? parseFloat(fields.data.amount).toString()
              : null,
          categoryId: fields.data.category,
          account: fields.data.account,
          financialYearId: currentFinancialYearId,
          organisationId: organisation.id,
        })
        .returning({ id: transactionsTable.id });
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, errors: "Failed to create payment." };
  }

  revalidatePath(`/cashbook?account=${fields.data.account}`);

  return {
    success: true,
    errors: null,
  };
};
