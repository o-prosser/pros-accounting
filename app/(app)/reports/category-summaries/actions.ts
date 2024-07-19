"use server";

import db from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  categoryId: z.string().length(36),
  from: z.string().max(100),
  to: z.string().max(100),
})

export const generateReport = async (formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
    }
  }

  console.log(fields.data);

  const transactions = await db.query.transactionsTable.findMany({
    where: (column, {and, eq, lt, gt}) => and(eq(column.categoryId, fields.data.categoryId), lt(column.date, new Date(fields.data.to)), gt(column.date, new Date(fields.data.from))),
    columns: {
      id: true,
      income: true,
      expense: true,
      subCategoryId: true,
    },
  });

  console.log(transactions);
}