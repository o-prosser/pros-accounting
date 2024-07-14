"use server";

import { usersTable } from "@/drizzle/schema";
import { organisationsTable } from "@/drizzle/schema/organisations";
import { createSession, getSession } from "@/lib/auth";
import db from "@/lib/db";
import { insertSession } from "@/models/session";
import { insertUser } from "@/models/user";
import { hashPassword } from "@/utils/auth";
import { addMonths } from "date-fns";
import { DrizzleError, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
})

export const setupAction = async (formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
    }
  }

  try {
    const session = await getSession();
    if (!session) throw new Error();

    if (fields.data.name.length === 36 && fields.data.name.split("-").length === 5) {  
      await db.update(usersTable).set({
        organisationId: fields.data.name,
      }).where(eq(usersTable.id, session.user.id));
    } else {
      const organisation = await db.insert(organisationsTable).values({
        name: fields.data.name,
        slug: fields.data.name.toLowerCase().trim().replace(" ", "-"),
        ownerId: session.user.id,
      }).returning({id: organisationsTable.id})
  
      await db.update(usersTable).set({
        organisationId: organisation[0].id,
      }).where(eq(usersTable.id, session.user.id));
    }

  } catch (error) {
    if (error instanceof DrizzleError && error.message === "AUTH_DUPLICATE_KEY_ID") {
      return {
        error: {
          email: ["A user with this email already exists."],
        }
      }
    } else {
      return {
        error: {
          email: ["An error occurred. Please try again"]
        }
      }
    }
  }

  redirect("/dashboard")
}