import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { categoriesTable } from "./categories";
import { transactionsTable } from "./transactions";

export const organisationsTable = pgTable("organisations", {
  id: uuid("id").notNull().unique().primaryKey().default(sql`gen_random_uuid()`),
  ownerId: uuid("ownerId").notNull(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type InsertOrganisation = typeof organisationsTable.$inferInsert
export type SelectOrganisation = typeof organisationsTable.$inferSelect

export const organisationsRelations = relations(organisationsTable, ({many}) => ({
  users: many(usersTable),
  categories: many(categoriesTable),
  transactions: many(transactionsTable),
}))