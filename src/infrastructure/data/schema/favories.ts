import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './';
import { posts } from './';

export const favories = pgTable('favorites', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    postId: uuid('post_id').references(() => posts.id).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});
