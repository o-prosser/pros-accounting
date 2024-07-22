import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const resetPasswordTokensTable = pgTable("reset_password_tokens", {
  token: varchar("token", {length: 6}).notNull().unique().primaryKey(),
  email: varchar("email", {length: 255}).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})