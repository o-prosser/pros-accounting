import { relations, sql } from "drizzle-orm";
import { date, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories";
import { subCategoriesTable } from "./subCategories";
import { organisationsTable } from "./organisations";

export const transactionsTable = pgTable("transactions", {
  id: uuid("id").notNull().unique().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", {length: 50}).notNull(),
  date: date("date").notNull(),
  income: numeric("income"),
  expense: numeric("expense"),
  categoryId: uuid("categoryId").notNull().references(() => categoriesTable.id, {onDelete: 'cascade'}),
  subCategoryId: uuid("subCategoryId").notNull().references(() => subCategoriesTable.id, {onDelete: 'cascade'}),
  organisationId: uuid("organisationId").notNull().references(() => organisationsTable.id, {onDelete: 'cascade'}),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertTransaction = typeof transactionsTable.$inferInsert
export type SelectTransaction = typeof transactionsTable.$inferSelect

export const transactionsRelations = relations(transactionsTable, ({one}) => ({
  category: one(categoriesTable, {
    fields: [transactionsTable.categoryId],
    references: [categoriesTable.id]
  }),
  subCategory: one(subCategoriesTable, {
    fields: [transactionsTable.subCategoryId],
    references: [subCategoriesTable.id]
  }),
  organisation: one(organisationsTable, {
    fields: [transactionsTable.organisationId],
    references: [organisationsTable.id]
  })
}));
