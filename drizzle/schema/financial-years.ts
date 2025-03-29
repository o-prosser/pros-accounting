import { relations, sql } from "drizzle-orm";
import { boolean, date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { organisationsTable } from "./organisations";
import { transactionsTable } from "./transactions";
import { transfersTable } from "./transfers";

export const financialYearsTable = pgTable("financialYears", {
  id: uuid("id")
    .notNull()
    .unique()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organisationId: uuid("organisationId")
    .notNull()
    .references(() => organisationsTable.id, { onDelete: "cascade" }),
  startDate: date("startDate", {mode: "date"}).notNull(),
  endDate: date("endDate", {mode: "date"}).notNull(),
  isCurrent: boolean("isCurrent").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertFinancialYear = typeof financialYearsTable.$inferInsert;
export type SelectFinancialYear = typeof financialYearsTable.$inferSelect;

export const financialYearsRelations = relations(
  financialYearsTable,
  ({ one, many }) => ({
    organisation: one(organisationsTable, {
      fields: [financialYearsTable.organisationId],
      references: [organisationsTable.id],
    }),
    transactions: many(transactionsTable),
    transfers: many(transfersTable),
  }),
);
