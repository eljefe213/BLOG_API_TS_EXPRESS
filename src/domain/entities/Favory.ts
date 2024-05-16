import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { favories } from "../../infrastructure/data/schema"; 

export type Favorite = InferSelectModel<typeof favories>;

export type NewFavorite = InferInsertModel<typeof favories>;

export type FavoriteColumns = { [K in keyof Favorite]?: boolean };