import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { CategoryService } from '../../../domain/services/CategoryService';
import { CategoryRepository } from '../../repositories/CategoryRepository';

export const categoryRouter = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

// Définition des routes pour les catégories
categoryRouter.get('/', (req, res) => categoryController.getAllCategories(req, res));
categoryRouter.get('/:id', (req, res) => categoryController.getCategoryById(req, res));
categoryRouter.post('/', (req, res) => categoryController.createCategory(req, res));
categoryRouter.delete('/:id', (req, res) => categoryController.deleteCategory(req, res));
