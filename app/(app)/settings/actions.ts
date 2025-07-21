"use server";

import { financialYearsTable, organisationsTable } from "@/drizzle/schema";
import InviteEmail from "@/emails/invite";
import db from "@/lib/db";
import { resend } from "@/lib/resend";
import { selectCurrentOrganisation } from "@/models/organisation";
import { isWithinInterval } from "date-fns";
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
    react: InviteEmail({
      organisationName: organisation.name,
      name: email.split("@")[0],
      link: ``,
    }),
  });

  redirect("/settings?status=invited");
};

const updateOrganisationSchema = z.object({
  name: z.string().min(3).max(255),
  endOfFinancialYear: z.string().min(3).max(255),
  initialClubBalance: z.string().nullable(),
  initialCharityBalance: z.string().nullable(),
  initialDutchBalance: z.string().nullable(),
  themeColour: z.string().nullable(),
});

export const updateOrganisation = async (formData: FormData) => {
  const fields = updateOrganisationSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!fields.success) {
    // return {
    //   errors: fields.error.flatten().fieldErrors,
    // };

    throw new Error();
  }

  const organisationId = (await selectCurrentOrganisation()).id;

  await db
    .update(organisationsTable)
    .set({
      name: fields.data.name,
      endOfFinancialYear: new Date(fields.data.endOfFinancialYear),
      initialCharityBalance: fields.data.initialCharityBalance || null,
      initialClubBalance: fields.data.initialClubBalance || null,
      initialDutchBalance: fields.data.initialDutchBalance || null,
      themeColour: fields.data.themeColour?.replace("#", ""),
    })
    .where(eq(organisationsTable.id, organisationId));

  revalidatePath("/settings");
};

const addFinancialYearSchema = z.object({
  from: z.string().min(3).max(255),
  to: z.string().min(3).max(255),
  organisationId: z.string().min(3).max(255),
});

export const addFinancialYear = async (formData: FormData) => {
  const fields = addFinancialYearSchema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    // return {
    //   errors: fields.error.flatten().fieldErrors,
    // };

    throw new Error();
  }

  await db.insert(financialYearsTable).values({
    startDate: new Date(fields.data.from),
    endDate: new Date(fields.data.to),
    organisationId: fields.data.organisationId,
    isCurrent: isWithinInterval(new Date(), {
      start: new Date(fields.data.from),
      end: new Date(fields.data.to),
    }),
  });

  revalidatePath("/settings");
};

export const makeFinancialYearCurrent = async (formData: FormData) => {
  const financialYearId = formData.get("financialYearId") as string;

  if (!financialYearId) {
    // return {
    //   error: "Financial year ID is required",
    // };

    throw new Error();
  }

  const organisation = await selectCurrentOrganisation();

  await db
    .update(financialYearsTable)
    .set({ isCurrent: false })
    .where(eq(financialYearsTable.organisationId, organisation.id));

  await db
    .update(financialYearsTable)
    .set({ isCurrent: true })
    .where(eq(financialYearsTable.id, financialYearId));

  revalidatePath("/settings");
};
