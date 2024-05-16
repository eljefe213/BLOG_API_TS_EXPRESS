import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users, posts } from './';

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('postId').references(() => posts.id).onDelete('CASCADE').notNull(),
    authorId: uuid('authorId').references(() => users.id).onDelete('CASCADE').notNull(),
    content: text('content').notNull(),
    date: timestamp('date').defaultNow().notNull()
});
