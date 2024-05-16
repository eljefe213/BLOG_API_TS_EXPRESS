import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { posts } from "./posts";

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('postId').references(() => posts.id).notNull(),
    name: varchar('name', { length: 255 }).notNull()
})