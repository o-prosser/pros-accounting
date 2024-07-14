import { InsertUser, SelectUser, usersTable } from "@/drizzle/schema";
import db from "@/lib/db";

export const insertUser = async (data: InsertUser) => {
  return (await db.insert(usersTable).values(data).returning({
    id: usersTable.id,
    email: usersTable.email,
  }))[0];
}

export const selectUserPassword = async ({email}: {email: SelectUser["email"]}) => {
  return await db.query.usersTable.findFirst({
    where: (fields, {eq}) => eq(fields.email, email),
    columns: {
      id: true,
      email: true,
      password: true,
    },
  })
}