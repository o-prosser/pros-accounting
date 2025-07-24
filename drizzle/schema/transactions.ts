import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories";
import { subCategoriesTable } from "./subCategories";
import { organisationsTable } from "./organisations";
import { filesTable } from "./files";
import { accountEnum } from "./enums";
import { financialYearsTable } from "./financial-years";

export const transactionsTable = pgTable("transactions", {
  id: uuid("id")
    .notNull()
    .unique()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 50 }).notNull(),
  date: date("date", { mode: "date" }).notNull(),
  receiptBookNumber: numeric("receiptBookNumber"),
  income: numeric("income"),
  expense: numeric("expense"),
  account: accountEnum("account"),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => categoriesTable.id, { onDelete: "cascade" }),
  subCategoryId: uuid("subCategoryId").references(() => subCategoriesTable.id, {
    onDelete: "set null",
  }),
  organisationId: uuid("organisationId")
    .notNull()
    .references(() => organisationsTable.id, { onDelete: "cascade" }),
  financialYearId: uuid("financialYearId").references(
    () => financialYearsTable.id,
    { onDelete: "cascade" },
  ),
  notes: text("notes"),
  fileId: uuid("fileId").references(() => filesTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertTransaction = typeof transactionsTable.$inferInsert;
export type SelectTransaction = typeof transactionsTable.$inferSelect;

export const transactionsRelations = relations(
  transactionsTable,
  ({ one }) => ({
    category: one(categoriesTable, {
      fields: [transactionsTable.categoryId],
      references: [categoriesTable.id],
    }),
    subCategory: one(subCategoriesTable, {
      fields: [transactionsTable.subCategoryId],
      references: [subCategoriesTable.id],
    }),
    organisation: one(organisationsTable, {
      fields: [transactionsTable.organisationId],
      references: [organisationsTable.id],
    }),
    file: one(filesTable, {
      fields: [transactionsTable.fileId],
      references: [filesTable.id],
    }),
    financialYear: one(financialYearsTable, {
      fields: [transactionsTable.financialYearId],
      references: [financialYearsTable.id],
    }),
  }),
);
