import express from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEventById } from '../controllers/EventController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

// GET localhost:8000/events
router.get('/', getAllEvents);    // GET /events

// GET localhost:8000/events/:id
// Exemple: localhost:8000/events/123
router.get('/:id', getEventById);    // GET /events/:id

// POST localhost:8000/events
router.post('/', isAuthenticated, createEvent);    // POST /events

// PUT localhost:8000/events/:id
// Exemple: localhost:8000/events/123
router.put('/:id', isAuthenticated, updateEvent);    // PUT /events/:id

// DELETE localhost:8000/events/:id
// Exemple: localhost:8000/events/123
router.delete('/:id', isAuthenticated, deleteEventById);    // DELETE /events/:id

export default router;
