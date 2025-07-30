"use server";

import {
  categoriesTable,
  transactionsTable,
  transfersTable,
} from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  id: z.string().min(3).max(100),
  name: z.string().min(3).max(50),
  colour: z.string().nullable(),
});

export const updateCategoryAction = async (
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

    const category = await db
      .update(categoriesTable)
      .set({
        name: fields.data.name,
        colour: fields.data.colour,
      })
      .where(eq(categoriesTable.id, fields.data.id))
      .returning({ id: categoriesTable.id });
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, errors: "Failed to update category." };
  }

  revalidatePath(`/categories`);

  return {
    success: true,
    errors: null,
  };
};
