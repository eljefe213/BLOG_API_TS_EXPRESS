import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './';

export const events = pgTable('events', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    author: uuid('author').references(() => users.id).notNull(),
    description: text('description').notNull(),
    date: timestamp('date').defaultNow().notNull(),
    isPublic: boolean('isPublic').default(true)
});
