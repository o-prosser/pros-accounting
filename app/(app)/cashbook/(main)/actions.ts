"use server";

import { transactionsTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTransaction = async (prevState: any, formData: FormData) => {
  const id = formData.get("id") as string;
  if (!id || id === null || id.length !== 36)
    throw new Error("Invalid ID provided");

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
    columns: { account: true },
  });

  await db.delete(transactionsTable).where(eq(transactionsTable.id, id));

  revalidatePath(`/cashbook?account=${transaction?.account || ""}`);

  return {
    success: true,
    errors: {
      id: [],
    },
  };

  // redirect(`/cashbook?account=${transaction?.account || ""}`);
};
