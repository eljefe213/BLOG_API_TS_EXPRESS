import { Request, Response } from 'express';
import { EventService } from '../../../domain/services/EventService';
import { response } from '../../../utils/response';

import { EventRepository } from '../../repositories/EventRepository'; 

const eventRepository = new EventRepository();

const eventService = new EventService(eventRepository);

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventService.getAllEvents();
        response(res, { statusCode: 200, message: 'OK', data: events });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        if (!event) {
            response(res, { statusCode: 404, message: 'Event not found' });
        } else {
            response(res, { statusCode: 200, message: 'OK', data: event });
        }
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, author, description, date, isPublic } = req.body;
        if (!title || !author || !description || !date || !isPublic) {
            return response(res, { statusCode: 400, message: 'All fields are required' });
        }

        const newEvent = await eventService.createEvent({
            title,
            author,
            description,
            date,
            isPublic
        });
        response(res, { statusCode: 201, message: 'Event created', data: newEvent });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const { title, author, description, date, isPublic } = req.body;
        if (!title || !author || !description || !date || !isPublic) {
            return response(res, { statusCode: 400, message: 'All fields are required' });
        }

        await eventService.updateEvent({
            id: eventId,
            title,
            author,
            description,
            date,
            isPublic
        });
        response(res, { statusCode: 200, message: 'Event updated' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        await eventService.deleteEventById(eventId);
        response(res, { statusCode: 200, message: 'Event deleted' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};
