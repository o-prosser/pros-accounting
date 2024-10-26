import { relations, sql } from "drizzle-orm";
import {
  date,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { organisationsTable } from "./organisations";
import { accountEnum } from "./enums";
import { categoriesTable } from "./categories";

export const transfersTable = pgTable("transfers", {
  id: uuid("id")
    .notNull()
    .unique()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  date: date("date", { mode: "date" }).notNull(),
  from: accountEnum("from").notNull(),
  to: accountEnum("to").notNull(),
  amount: numeric("amount").notNull(),
  categoryId: uuid("categoryId")
    .references(() => categoriesTable.id, { onDelete: "cascade" }),
  notes: text("notes"),
  organisationId: uuid("organisationId")
    .notNull()
    .references(() => organisationsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertTransfer = typeof transfersTable.$inferInsert;
export type SelectTransfer = typeof transfersTable.$inferSelect;

export const transfersRelations = relations(
  transfersTable,
  ({ one }) => ({
    organisation: one(organisationsTable, {
      fields: [transfersTable.organisationId],
      references: [organisationsTable.id],
    }),
    category: one(categoriesTable, {
      fields: [transfersTable.categoryId],
      references: [categoriesTable.id],
    }),
  }),
);