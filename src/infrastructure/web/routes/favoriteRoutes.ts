import express from 'express';
import { getAllFavorites, getFavoriteById, createFavorite, deleteFavoriteById } from '../controllers/FavoriteController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

// GET localhost:8000/favorites
router.get('/', getAllFavorites);    // GET /favorites

// GET localhost:8000/favorites/:id
// Exemple: localhost:8000/favorites/123
router.get('/:id', getFavoriteById);    // GET /favorites/:id

// POST localhost:8000/favorites
router.post('/', isAuthenticated, createFavorite);    // POST /favorites

// DELETE localhost:8000/favorites/:id
// Exemple: localhost:8000/favorites/123
router.delete('/:id', isAuthenticated, deleteFavoriteById);    // DELETE /favorites/:id

export default router;