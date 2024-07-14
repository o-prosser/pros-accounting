import { InsertSession, SelectSession, sessionsTable } from "@/drizzle/schema"
import db from "@/lib/db"

export const selectSession = async ({id}: {id: SelectSession["id"]}) => {
  const session = await db.query.sessionsTable.findFirst({
    where: (fields, {eq}) => eq(fields.id, id),
    columns: {id: true, expiresAt: true,},
    with: {
      user: {
        columns: {
          id: true,
          organisationId: true,
          email: true,
          firstName: true,
          lastName: true,
          avatar: true,
        }
      }
    }
  });

  return session;
}

export const insertSession = async (data: InsertSession) => {
  return (await db.insert(sessionsTable).values(data).returning({
    id: sessionsTable.id,
  }))[0];
}