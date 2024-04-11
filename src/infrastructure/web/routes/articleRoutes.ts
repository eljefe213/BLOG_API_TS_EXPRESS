import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';
import { ArticleService } from '../../../domain/services/ArticleService';
import { ArticleRepository } from '../../repositories/ArticleRepository';
import { authMiddleware } from '../../../middlewares/authMiddleware';

export const articleRouter = Router();

const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

// Définition des routes pour les articles
articleRouter.get('/', (req, res) => articleController.getAllArticles(req, res));
articleRouter.get('/:id', (req, res) => articleController.getArticleById(req, res));
articleRouter.post('/', authMiddleware, (req, res) => articleController.createArticle(req, res));
articleRouter.delete('/:id', authMiddleware, (req, res) => articleController.deleteArticle(req, res));
