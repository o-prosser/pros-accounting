"use server";

import { transactionsTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const deleteTransaction = async (formData: FormData) => {
  const id = formData.get("id") as string;
  if (!id || id === null || id.length !== 36) throw new Error("Invalid ID provided");
  
  await db.delete(transactionsTable).where(eq(transactionsTable.id, id));

  redirect("/transactions");
}