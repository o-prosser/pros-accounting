"use server";

import { sessionsTable } from "@/drizzle/schema";
import { clearSession, getSession } from "@/lib/auth";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const logout = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  // Remove cookie
  clearSession();

  // Set db entry to expire now so can't be used in future
  await db
    .update(sessionsTable)
    .set({
      expiresAt: new Date(),
    })
    .where(eq(sessionsTable.id, session.id));

  redirect("/login");
};
