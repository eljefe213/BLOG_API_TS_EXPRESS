import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable('posts', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    author: uuid('author').references(() => users.id).notNull(),
    date: timestamp('date').defaultNow().notNull()
});