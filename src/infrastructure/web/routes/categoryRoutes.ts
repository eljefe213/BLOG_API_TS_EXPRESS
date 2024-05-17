import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategoryById } from '../controllers/CategoryController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

// GET localhost:8000/categories
router.get('/', getAllCategories);    // GET /categories

// GET localhost:8000/categories/:id
// Exemple: localhost:8000/categories/123
router.get('/:id', getCategoryById);    // GET /categories/:id

// POST localhost:8000/categories
router.post('/', isAuthenticated, createCategory);    // POST /categories

// PUT localhost:8000/categories/:id
// Exemple: localhost:8000/categories/123
router.put('/:id', isAuthenticated, updateCategory);    // PUT /categories/:id

// DELETE localhost:8000/categories/:id
// Exemple: localhost:8000/categories/123
router.delete('/:id', isAuthenticated, deleteCategoryById);    // DELETE /categories/:id

export default router;