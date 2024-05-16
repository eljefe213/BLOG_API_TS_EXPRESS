import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { events } from "../../infrastructure/data/schema/events";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;