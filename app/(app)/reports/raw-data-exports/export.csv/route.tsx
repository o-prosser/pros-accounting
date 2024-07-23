import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { format } from "date-fns";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  categoryId: z.string().length(36).nullable(),
  from: z.string().max(100),
  to: z.string().max(100),
});

export const GET = async (request: NextRequest) => {
  const fields = schema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  if (!fields.success) throw new Error();

  const organisation = await selectCurrentOrganisation();

  const transactions = await db.query.transactionsTable.findMany({
    where: (column, { and, eq, lt, gt }) => fields.data.categoryId !== null ? and(
      eq(column.categoryId, fields.data.categoryId),
      eq(column.organisationId, organisation.id),
      lt(column.date, new Date(fields.data.to)),
      gt(column.date, new Date(fields.data.from))
    ) :
      and(
        eq(column.organisationId, organisation.id),
        lt(column.date, new Date(fields.data.to)),
        gt(column.date, new Date(fields.data.from))
      ),
   with: {
    category: true,
    subCategory: true,
   }
  });

  const csvHeaders = `Name,Date,Category,Sub category,Account,Income,Expense,Notes`;
  const rows = transactions.map(transaction => `${transaction.name.replace(",","")},${format(transaction.date, "dd-MM-yyyy")},${transaction.category.name.replace(",","")},${transaction.subCategory?.name.replace(",","")},${transaction.category.account},${transaction.income ? parseFloat(transaction.income).toFixed(2) : ""},${transaction.expense ? parseFloat(transaction.expense).toFixed(2) : ""},${transaction.notes ? transaction.notes.replace(",","") : ""}`);

  return new Response(`${csvHeaders}\n${rows.join(`\n`)}`);
}