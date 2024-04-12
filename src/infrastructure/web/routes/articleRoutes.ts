import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';
import { ArticleService } from '../../../domain/services/ArticleService';
import { ArticleRepository } from '../../repositories/ArticleRepository';
import { authMiddleware } from '../../../middlewares/authMiddleware';

export const articleRouter = Router();

const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieves a list of articles
 *     description: Retrieves a list of all articles.
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articleRouter.get('/', articleController.getAllArticles.bind(articleController));

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Retrieves a single article by ID
 *     description: Retrieves details of an article specified by the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the article to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An article object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
articleRouter.get('/:id', articleController.getArticleById.bind(articleController));

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Creates a new article
 *     description: Creates a new article with the provided data.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Invalid input data
 */
articleRouter.post('/', authMiddleware, articleController.createArticle.bind(articleController));

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Deletes an article
 *     description: Deletes the article with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the article to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
articleRouter.delete('/:id', authMiddleware, articleController.deleteArticle.bind(articleController));
