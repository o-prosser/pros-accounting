"use server";

import { transfersTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string().length(36).optional(),
  date: z.string().min(3).max(50),
  from: z.string().max(100),
  to: z.string().max(100),
  amount: z.string().max(10).min(1),
  notes: z.string().nullable()
})

export const createTransferAction = async (prevState: any, formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
      success: false,
      newId: "",
    }
  }

  let id = "";

  try {
    const organisation = await selectCurrentOrganisation();

    const transfer = await db.insert(transfersTable).values({
      date: new Date(fields.data.date),
      from: fields.data.from === 'club' ? 'club' : 'charity',
      to: fields.data.to === 'club' ? 'club' : 'charity',
      amount: parseFloat(fields.data.amount).toString(),
      notes: fields.data.notes,
      organisationId: organisation.id
    }).returning({id: transfersTable.id});

    id = transfer[0].id
  } catch (error) {
    return {
      success: false,
      newId: "",
      errors: {
        amount: ["An error occurred. Please try again"]
      }
    }
  }

  revalidatePath(`/transfers`)

    return {
      success: true,
      newId: id,
      errors: {
        amount: [""],
      },
    };
}

export const updateTransferAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
      success: false,
      updatedId: "",
    };
  }

  try {
    if (!fields.data.id) throw new Error();

    await db
      .update(transfersTable)
      .set({
        date: new Date(fields.data.date),
        from: fields.data.from === "club" ? "club" : "charity",
        to: fields.data.to === "club" ? "club" : "charity",
        amount: parseFloat(fields.data.amount).toString(),
        notes: fields.data.notes,
      })
      .where(eq(transfersTable.id, fields.data.id));
  } catch (error) {
    return {
      success: false,
      updatedId: "",
      errors: {
        amount: ["An error occurred. Please try again"],
      },
    };
  }

  revalidatePath(`/transfers`);

  return {
    success: true,
    updatedId: fields.data.id,
    errors: {
      amount: [""],
    },
  };
};

export const deleteTransferAction = async (prevState: any, formData: FormData) => {
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

  revalidatePath('/transfers')

  return {
    success: true,
    deletedId: id,
  }
}