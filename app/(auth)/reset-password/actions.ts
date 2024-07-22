"use server";

import { resetPasswordTokensTable, usersTable } from "@/drizzle/schema";
import { createSession } from "@/lib/auth";
import db from "@/lib/db";
import { insertSession } from "@/models/session";
import { hashPassword } from "@/utils/auth";
import { addMonths, differenceInSeconds } from "date-fns";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const resetPasswordAction = async (prevState: any, formData: FormData) => {
  const form = formData.get("_form") as string;

  if (form === 'token') {
    const code = formData.get("token") as string;
    if (code.length !== 6) throw new Error("Invalid code format.");
  
    const token = await db.query.resetPasswordTokensTable.findFirst({
      where: (fields, { eq }) => eq(fields.token, code),
      orderBy: (fields, { desc }) => desc(fields.createdAt),
    });
    if (!token) throw new Error("Invalid code.");
    if (differenceInSeconds(token.createdAt, new Date()) > 60 * 60 * 10) throw new Error("Token out of date");
  
    return {valid: true, email: token.email, token: token.token};
  }

  if (form === 'password') {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const token = formData.get("token") as string;

    const user = await db.update(usersTable).set({
      password: await hashPassword(password)
    }).where(eq(usersTable.email, email)).returning({id: usersTable.id})

    // Delete token
    await db.delete(resetPasswordTokensTable).where(eq(resetPasswordTokensTable.token, token));

    const session = await insertSession({
      userId: user[0].id,
      expiresAt: addMonths(new Date(), 1),
    });

    await createSession(session.id);

    redirect("/dashboard");
  }
}