import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { sessionsTable } from "./sessions";
import { organisationsTable } from "./organisations";

export const usersTable = pgTable("users", {
  id: uuid("id").notNull().unique().primaryKey().default(sql`gen_random_uuid()`),
  organisationId: uuid("organisationId").references(() => organisationsTable.id, {onDelete: "set null"}),
  email: varchar("email", {length: 70}).notNull().unique(),
  firstName: varchar("firstName", {length: 50}).notNull(),
  lastName: varchar("lastName", {length: 50 }),
  avatar: text("avatar"),
  password: text("password").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}) 

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const usersRelations = relations(usersTable, ({one, many}) => ({
  sessions: many(sessionsTable),
  organisation: one(organisationsTable, {
    fields: [usersTable.organisationId],
    references: [organisationsTable.id]
  })
}))