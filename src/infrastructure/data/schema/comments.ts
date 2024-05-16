import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('postId').references(() => posts.id).notNull(),
    author: uuid('author').references(() => users.id).notNull(),
    content: text('content').notNull(),
    date: timestamp('date').defaultNow().notNull()
});
