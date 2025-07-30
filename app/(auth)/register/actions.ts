"use server";

import { createSession } from "@/lib/auth";
import { resend } from "@/lib/resend";
import { insertSession } from "@/models/session";
import { insertUser } from "@/models/user";
import { hashPassword } from "@/utils/auth";
import { addMonths } from "date-fns";
import { DrizzleError } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import WelcomeEmail from "@/emails/welcome";

const schema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().max(100),
  password: z.string().max(255),
});

export const registerAction = async (formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    // return {
    //   error: fields.error.flatten().fieldErrors,
    // }

    throw new Error();
  }

  try {
    const user = await insertUser({
      email: fields.data.email,
      password: await hashPassword(fields.data.password),
      firstName: fields.data.name.split(" ")[0],
      lastName: fields.data.name.split(" ")[1],
    });

    const session = await insertSession({
      userId: user.id,
      expiresAt: addMonths(new Date(), 1),
    });

    await createSession(session.id);

    await resend.emails.send({
      from: "ProsAccounting <prosaccounting@prossermedia.co.uk>",
      to: fields.data.email,
      subject: "Welcome to ProsAccounting",
      react: WelcomeEmail({ name: fields.data.name.split(" ")[0] }),
    });
  } catch (error) {
    throw error;

    // if (error instanceof DrizzleError && error.message === "AUTH_DUPLICATE_KEY_ID") {
    //   return {
    //     error: {
    //       email: ["A user with this email already exists."],
    //     }
    //   }
    // } else {
    //   return {
    //     error: {
    //       email: ["An error occurred. Please try again"]
    //     }
    //   }
    // }
  }

  redirect("/setup");
};
