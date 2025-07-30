import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { organisationsTable } from "./organisations";
import { transactionsTable } from "./transactions";
import { subCategoriesTable } from "./subCategories";
import { accountEnum } from "./enums";
import { financialYearsTable, transfersTable } from ".";

export const categoriesTable = pgTable("categories", {
  id: uuid("id")
    .notNull()
    .unique()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 50 }).notNull(),
  account: accountEnum("account"),
  colour: varchar("colour", { length: 50 }),
  financialYearId: uuid("financialYearId").references(
    () => financialYearsTable.id,
    { onDelete: "cascade" },
  ),
  organisationId: uuid("organisationId")
    .notNull()
    .references(() => organisationsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;

export const categoriesRelations = relations(
  categoriesTable,
  ({ one, many }) => ({
    organisation: one(organisationsTable, {
      fields: [categoriesTable.organisationId],
      references: [organisationsTable.id],
    }),
    financialYear: one(financialYearsTable, {
      fields: [categoriesTable.financialYearId],
      references: [financialYearsTable.id],
    }),
    transactions: many(transactionsTable),
    transfers: many(transfersTable),
    subCategories: many(subCategoriesTable),
  }),
);
