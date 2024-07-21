"use server";

import InviteEmail from "@/emails/invite";
import { resend } from "@/lib/resend";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";

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