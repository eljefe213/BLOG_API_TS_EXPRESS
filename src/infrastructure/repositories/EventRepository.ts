import { db } from "../data";
import { events, users } from "../data/schema";
import { Event, NewEvent } from "../../domain/entities/Event";
import { eq } from "drizzle-orm";

export class EventRepository {
    /**
     * Récupère tous les événements
     */
    async getAllEvents(): Promise<Event[]> {
        try {
            const results = await db.select({
                date: events.date,
                id: events.id,
                title: events.title,
                author: events.author,
                description: events.description,
                isPublic: events.isPublic
            }).from(events).execute();
            
            return results as Event[];
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les événements');
        }
    }

    /**
     * Récupère un événement en fonction de son id
     */
    async getEventById(id: string): Promise<Event | undefined> {
        try {
            const result = await db.select({
                date: events.date,
                id: events.id,
                title: events.title,
                author: events.author,
                description: events.description,
                isPublic: events.isPublic
            }).from(events).where(eq(events.id, id)).execute().then(rows => rows[0]);
            return result as Event;
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer l\'événement');
        }
    }

    /**
     * Crée un nouvel événement
     */
    async createEvent(event: NewEvent): Promise<Event> {
        try {
            const result = await db.insert(events)
                .values(event)
                .returning({
                    date: events.date,
                    id: events.id,
                    title: events.title,
                    author: events.author,
                    description: events.description,
                    isPublic: events.isPublic
                })
                .execute()
                .then(rows => rows[0]);

            return result as Event;
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer l\'événement');
        }
    }


    /**
     * Met à jour un événement
     */
    async updateEvent(event: Event): Promise<void> {
        try {
            await db.update(events)
                .set(event)
                .where(eq(events.id, event.id))
                .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de mettre à jour l\'événement');
        }
    }

    /**
     * Supprime un événement en fonction de son id
     */
    async deleteEventById(id: string): Promise<void> {
        try {
            await db.delete(events)
                .where(eq(events.id, id))
                .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer l\'événement');
        }
    }
}
