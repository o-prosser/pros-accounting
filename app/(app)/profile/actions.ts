"use server";

import { usersTable } from "@/drizzle/schema";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50).optional().nullable(),
  email: z.email(),
});

export const updateProfileAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: z.prettifyError(fields.error),
      success: false,
    };
  }

  try {
    const session = await getSession();
    if (!session?.user) throw new Error("No user");

    await db
      .update(usersTable)
      .set({
        firstName: fields.data.firstName,
        lastName: fields.data.lastName,
        email: fields.data.email,
      })
      .where(eq(usersTable.id, session.user.id));
  } catch (error) {
    console.error("Error updating user:", error);

    return {
      success: false,
      errors: "Failed to update profile.",
    };
  }

  revalidatePath(`/profile`);

  return {
    success: true,
    errors: null,
  };
};
