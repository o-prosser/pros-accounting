import { InferSelectModel, sql } from "drizzle-orm";
import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SelectFile = InferSelectModel<typeof filesTable>;
