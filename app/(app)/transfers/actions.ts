"use server";

import { transfersTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().length(36).optional(),
  date: z.string().min(3).max(50),
  from: z.string().max(100),
  to: z.string().max(100),
  amount: z.string().max(10).min(1),
  category: z.string().max(100).optional().nullable(),
  notes: z.string().nullable(),
});

export const createTransferAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let id = "";

  try {
    const organisation = await selectCurrentOrganisation();

    const transfer = await db
      .insert(transfersTable)
      .values({
        date: new Date(fields.data.date),
        from:
          fields.data.from === "club"
            ? "club"
            : fields.data.from === "charity"
            ? "charity"
            : "dutch",
        to:
          fields.data.to === "club"
            ? "club"
            : fields.data.to === "charity"
            ? "charity"
            : "dutch",
        amount: parseFloat(fields.data.amount).toString(),
        notes: fields.data.notes,
        categoryId: fields.data.category,
        organisationId: organisation.id,
      })
      .returning({ id: transfersTable.id });

    id = transfer[0].id;
  } catch (error) {
    return {
      errors: {
        amount: ["An error occurred. Please try again"],
      },
    };
  }

  redirect(`/transactions/cash-book/${fields.data.to}`);
};

export const updateTransferAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  try {
    if (!fields.data.id) throw new Error();

    await db
      .update(transfersTable)
      .set({
        date: new Date(fields.data.date),
        from:
          fields.data.from === "club"
            ? "club"
            : fields.data.from === "charity"
            ? "charity"
            : "dutch",
        to:
          fields.data.to === "club"
            ? "club"
            : fields.data.to === "charity"
            ? "charity"
            : "dutch",
        amount: parseFloat(fields.data.amount).toString(),
        categoryId: fields.data.category,
        notes: fields.data.notes,
      })
      .where(eq(transfersTable.id, fields.data.id));
  } catch (error) {
    throw error;

    return {
      errors: {
        amount: ["An error occurred. Please try again"],
      },
    };
  }

  redirect(`/transactions/cash-book/${fields.data.to}`);
};

export const deleteTransferAction = async (
  prevState: any,
  formData: FormData,
) => {
  const id = formData.get("id") as string;

  try {
    if (!id) throw new Error();

    await db.delete(transfersTable).where(eq(transfersTable.id, id));
  } catch {
    return {
      success: false,
      deletedId: "",
    };
  }

  revalidatePath("/transfers");

  return {
    success: true,
    deletedId: id,
  };
};
