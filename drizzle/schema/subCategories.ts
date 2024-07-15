import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories";
import { transactionsTable } from "./transactions";

export const subCategoriesTable = pgTable("categories", {
  id: uuid("id").notNull().unique().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", {length: 50}).notNull(),
  categoryId: uuid("categoryId").notNull().references(() => categoriesTable.id, {onDelete: 'cascade'}),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertSubCategory = typeof subCategoriesTable.$inferInsert
export type SelectSubCategory = typeof subCategoriesTable.$inferSelect

export const subCategoriesRelations = relations(subCategoriesTable, ({one, many}) => ({
  category: one(categoriesTable, {
    fields: [subCategoriesTable.categoryId],
    references: [categoriesTable.id]
  }),
  transactions: many(transactionsTable),
}));
