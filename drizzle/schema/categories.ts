import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { organisationsTable } from "./organisations";
import { transactionsTable } from "./transactions";
import { subCategoriesTable } from "./subCategories";

export const accountEnum = pgEnum("account", ["club", "charity"])

export const categoriesTable = pgTable("categories", {
  id: uuid("id").notNull().unique().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", {length: 50}).notNull(),
  account: accountEnum("account").notNull(),
  organisationId: uuid("organisationId").notNull().references(() => organisationsTable.id, {onDelete: 'cascade'}),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertCategory = typeof categoriesTable.$inferInsert
export type SelectCategory = typeof categoriesTable.$inferSelect

export const categoriesRelations = relations(categoriesTable, ({one, many}) => ({
  organisation: one(organisationsTable, {
    fields: [categoriesTable.organisationId],
    references: [organisationsTable.id]
  }),
  transactions: many(transactionsTable),
  subCategories: many(subCategoriesTable),
}));
