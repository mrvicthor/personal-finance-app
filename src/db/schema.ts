import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uniqueIndex,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { InferInsertModel } from "drizzle-orm";
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    password: varchar("password").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const balance = pgTable("balance", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  current: doublePrecision("current").default(0),
  income: doublePrecision("income").default(0),
  expenses: doublePrecision("expenses").default(0),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  avatar: varchar("avatar").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  date: timestamp("date").notNull(),
  amount: doublePrecision("amount").notNull(),
  recurring: boolean("recurring").default(false),
});

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  category: varchar("category").notNull(),
  maximum: doublePrecision("maximum").notNull(),
  spent: doublePrecision("spent").default(0),
});

export const pots = pgTable("pots", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name").notNull(),
  target: doublePrecision("target").default(0),
  total: doublePrecision("total").default(0),
});

export type Session = InferInsertModel<typeof sessions>;
export type User = InferInsertModel<typeof users>;
export type Balance = InferInsertModel<typeof balance>;
export type Transaction = InferInsertModel<typeof transactions>;
export type Budget = InferInsertModel<typeof budgets>;
export type Pot = InferInsertModel<typeof pots>;
