"use server";

import { transactionsTable } from "@/drizzle/schema/transactions";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
  date: z.string().max(100),
  receiptBookNumber: z.string(),
  income: z.string().nullable(),
  expense: z.string().nullable(),
  category: z.string().max(100),
  subCategory: z.string().optional().nullable(),
  notes: z.string().nullable(),
  fileId: z.string().nullable(),
})

export const createTransactionAction = async (formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
    }
  }

  let id = "";

  try {
    const organisation = await selectCurrentOrganisation();

    const transaction = await db.insert(transactionsTable).values({
      // @ts-ignore
      name: fields.data.name,
      date: new Date(fields.data.date),
      receiptBookNumber: fields.data.receiptBookNumber,
      income: (fields.data.income !== "" && fields.data.income !== null) ? parseFloat(fields.data.income) : undefined,
      expense: (fields.data.expense !== "" && fields.data.expense !== null) ? parseFloat(fields.data.expense) : undefined,
      categoryId: fields.data.category,
      subCategoryId: fields.data.subCategory,
      notes: fields.data.notes,
      fileId: fields.data.fileId,
      organisationId: organisation.id,
    }).returning({id: transactionsTable.id});

    id = transaction[0].id
  } catch (error) {
    throw error;

    return {
      error: {
        name: ["An error occurred. Please try again"]
      }
    }
  }

  redirect(`/transactions/`)
}