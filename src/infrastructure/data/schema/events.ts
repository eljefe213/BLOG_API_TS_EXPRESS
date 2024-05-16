import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './';

export const events = pgTable('events', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizerId: uuid('organizerId').references(() => users.id).onDelete('CASCADE').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    location: text('location').notNull(),
    startDate: timestamp('startDate').notNull(),
    endDate: timestamp('endDate').notNull(),
    isPublic: boolean('isPublic').default(true),
    imageUrl: text('imageUrl').nullable()
});
