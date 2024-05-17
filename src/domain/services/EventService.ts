import { EventRepository } from '../../infrastructure/repositories/EventRepository';
import { Event, NewEvent } from '../entities/Event';

export class EventService {
    private eventRepository: EventRepository;

    constructor(eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    async getAllEvents(): Promise<Event[]> {
        try {
            return await this.eventRepository.getAllEvents();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer tous les événements");
        }
    }

    async getEventById(id: string): Promise<Event | undefined> {
        try {
            return await this.eventRepository.getEventById(id);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer l'événement");
        }
    }

    async createEvent(event: NewEvent): Promise<Event> {
        try {
            return await this.eventRepository.createEvent(event);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer l'événement");
        }
    }

    async updateEvent(event: Event): Promise<void> {
        try {
            await this.eventRepository.updateEvent(event);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de mettre à jour l'événement");
        }
    }

    async deleteEventById(id: string): Promise<void> {
        try {
            await this.eventRepository.deleteEventById(id);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de supprimer l'événement");
        }
    }
}
