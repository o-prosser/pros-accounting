"use server";

import { transfersTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  id: z.string().min(3).max(100),
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

export const updateTransferAction = async (
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

    const transfer = await db
      .update(transfersTable)
      .set({
        name: fields.data.name,
        date: new Date(fields.data.date),
        amount: parseFloat(fields.data.amount).toString(),
        categoryId: fields.data.category,
        from: fields.data.account,
        to: fields.data.account === "charity" ? "club" : "charity",
      })
      .where(eq(transfersTable.id, fields.data.id))
      .returning({ id: transfersTable.id });
  } catch (error) {
    console.error("Error updating payment:", error);
    return { success: false, errors: "Failed to update payment." };
  }

  revalidatePath(`/cashbook?account=${fields.data.account}`);

  return {
    success: true,
    errors: null,
  };
};
