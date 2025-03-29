"use server";

import { transactionsTable } from "@/drizzle/schema/transactions";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be at least 3 characters long." })
    .max(50, { message: "The name must be less than 50 characters long." }),
  date: z.string().max(100, { message: "The date provided was invalid." }),
  receiptBookNumber: z
    .string()
    // .regex(/([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/, {
    //   message: "The receipt book number must be a number. Leave blank to not add a receipt number.",
    // })
    .nullable(),
  income: z.string().nullable(),
  expense: z.string().nullable(),
  category: z
    .string()
    .length(36, { message: "You must add a category to the transaction." }),
  account: z.enum(["charity", "club", "dutch"], {message: "The account type is required."}),
  subCategory: z.string().optional().nullable(),
  notes: z.string().nullable(),
  fileId: z.string().nullable(),
});

export const createTransactionAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  if (
    (fields.data.income !== "" &&
      fields.data.income !== null &&
      fields.data.expense !== "" &&
      fields.data.expense !== null) ||
    ((fields.data.income == "" || fields.data.income == null) &&
      (fields.data.expense == "" || fields.data.expense == null))
  )
    return {
      errors: {
        income: ["Provide either an income or an expense."],
      },
    };

  let id = "";

  try {
    const organisation = await selectCurrentOrganisation();

    const transaction = await db
      .insert(transactionsTable)
      .values({
        // @ts-ignore
        name: fields.data.name,
        date: new Date(fields.data.date),
        account: fields.data.account,
        receiptBookNumber: fields.data.receiptBookNumber
          ? parseInt(fields.data.receiptBookNumber)
          : null,
        income:
          fields.data.income !== "" && fields.data.income !== null
            ? parseFloat(fields.data.income)
            : undefined,
        expense:
          fields.data.expense !== "" && fields.data.expense !== null
            ? parseFloat(fields.data.expense)
            : undefined,
        categoryId: fields.data.category,
        subCategoryId: fields.data.subCategory,
        notes: fields.data.notes,
        fileId: fields.data.fileId || null,
        organisationId: organisation.id,
        financialYearId: organisation.financialYears.find((f) => f.isCurrent)?.id
      })
      .returning({ id: transactionsTable.id });

    id = transaction[0].id;
  } catch (error) {
    return {
      errors: {
        name: ["An error occurred. Please try again"],
      },
    };
  }

  redirect(`/transactions/cash-book/${fields.data.account}`);
};
