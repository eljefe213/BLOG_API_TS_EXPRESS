import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { posts } from "../../infrastructure/data/schema/posts";

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;