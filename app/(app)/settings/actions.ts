"use server";

import { organisationsTable } from "@/drizzle/schema";
import InviteEmail from "@/emails/invite";
import db from "@/lib/db";
import { resend } from "@/lib/resend";
import { selectCurrentOrganisation } from "@/models/organisation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const invite = async (formData: FormData) => {
  const email = formData.get("email") as string;

  const organisation = await selectCurrentOrganisation();

  await resend.emails.send({
    from: "ProsAccounting <prosaccounting@prossermedia.co.uk>",
    to: email,
    subject: `Invitation to join ${organisation.name}`,
    react: InviteEmail({organisationName: organisation.name, name: email.split("@")[0], link: ``})
  })

  redirect("/settings?status=invited")
}

const updateOrganisationSchema = z.object({
  name: z.string().min(3).max(255),
  endOfFinancialYear: z.string().min(3).max(255),
  initialClubBalance: z.string().nullable(),
  initialCharityBalance: z.string().nullable(),
  themeColour: z.string().nullable(),
})

export const updateOrganisation = async (formData: FormData) => {
  const fields = updateOrganisationSchema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const organisationId = (await selectCurrentOrganisation()).id;

  await db.update(organisationsTable).set({
    name: fields.data.name,
    endOfFinancialYear: new Date(fields.data.endOfFinancialYear),
    initialCharityBalance: fields.data.initialCharityBalance,
    initialClubBalance: fields.data.initialClubBalance,
    themeColour: fields.data.themeColour?.replace("#",""),
  }).where(eq(organisationsTable.id, organisationId));

  revalidatePath("/settings");
}