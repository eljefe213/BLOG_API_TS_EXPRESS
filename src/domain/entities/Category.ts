import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { categories } from "../../infrastructure/data/schema/categories";

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

