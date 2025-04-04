import { relations, sql } from "drizzle-orm";
import {
  date,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { categoriesTable } from "./categories";
import { transactionsTable } from "./transactions";
import { transfersTable } from "./transfers";
import { financialYearsTable } from "./financial-years";

export const organisationsTable = pgTable("organisations", {
  id: uuid("id")
    .notNull()
    .unique()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  ownerId: uuid("ownerId").notNull(),
  name: varchar("name").notNull(),
  endOfFinancialYear: date("end_of_financial_year", { mode: "date" })
    .defaultNow()
    .notNull(),
  initialClubBalance: numeric("initial_club_balance"),
  initialCharityBalance: numeric("initial_charity_balance"),
  initialDutchBalance: numeric("initial_dutch_balance"),
  themeColour: varchar("theme_colour", { length: 6 }),
  logo: text("logo"),
  slug: varchar("slug").unique().notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type InsertOrganisation = typeof organisationsTable.$inferInsert;
export type SelectOrganisation = typeof organisationsTable.$inferSelect;

export const organisationsRelations = relations(
  organisationsTable,
  ({ many }) => ({
    users: many(usersTable),
    categories: many(categoriesTable),
    transactions: many(transactionsTable),
    transfers: many(transfersTable),
    financialYears: many(financialYearsTable),
  }),
);
