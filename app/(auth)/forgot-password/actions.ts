"use server";

import { resetPasswordTokensTable } from "@/drizzle/schema";
import ResetPasswordEmail from "@/emails/reset-password";
import db from "@/lib/db";
import { resend } from "@/lib/resend";
import { differenceInSeconds } from "date-fns";
import { redirect } from "next/navigation";

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;

  // User exists?
  const user = await db.query.usersTable.findFirst({
    where: (fields, {eq}) => eq(fields.email, email),
    columns: {
      id: true,
      email: true,
    }
  });

  if (!user) redirect("/reset-password");

  // Already sent token in last 10 minutes?
  const currentToken = await db.query.resetPasswordTokensTable.findFirst({
    where: (fields, {eq}) => eq(fields.email, email),
    orderBy: (fields, {desc}) => desc(fields.createdAt),
  });
  if (currentToken && differenceInSeconds(currentToken.createdAt, new Date()) < 60 * 10) redirect("/reset-password");

  // Create code
  const token =  Array.from(Array(6).keys()).map(() => Math.random().toString().charAt(3)).join("");

  // Save token
  await db.insert(resetPasswordTokensTable).values({
    token,
    email
  });

  // Send email
  await resend.emails.send({
    from: 'ProsAccounting <prosaccounting@prossermedia.co.uk>',
    to: email,
    subject: `Your one time reset code is ${token}`,
    react: ResetPasswordEmail({code: token})
  })

  redirect("/reset-password")
}