import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { comments } from "../../infrastructure/data/schema/comments";

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;