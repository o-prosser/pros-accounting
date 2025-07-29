import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { financialYearsTable } from "./financial-years";
import { organisationsTable } from "./organisations";
import { transactionsTable } from "./transactions";

export const filesTable = pgTable("files", {
  id: uuid("id")
    .notNull()
    .unique()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  key: text("key").notNull(),
  name: varchar("name").notNull(),
  size: numeric("size"),
  type: varchar("type"),
  organisationId: uuid("organisationId").references(
    () => organisationsTable.id,
    { onDelete: "cascade" },
  ),
  financialYearId: uuid("financialYearId").references(
    () => financialYearsTable.id,
    { onDelete: "cascade" },
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SelectFile = InferSelectModel<typeof filesTable>;

export const filesRelations = relations(filesTable, ({ one, many }) => ({
  organisation: one(organisationsTable, {
    fields: [filesTable.organisationId],
    references: [organisationsTable.id],
  }),
  financialYear: one(financialYearsTable, {
    fields: [filesTable.financialYearId],
    references: [financialYearsTable.id],
  }),
  transactions: many(transactionsTable),
}));
