import { pgEnum } from "drizzle-orm/pg-core";

export const accountEnum = pgEnum("account", ["club", "charity", "dutch"]);
