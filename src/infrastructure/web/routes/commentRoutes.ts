import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { CommentService } from '../../../domain/services/CommentService';
import { CommentRepository } from '../../../infrastructure/repositories/CommentRepository';

export const commentRouter = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

/**
 * @swagger
 * /comments/article/{articleId}:
 *   get:
 *     summary: Get comments by article ID
 *     description: Retrieves all comments associated with a specific article.
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to retrieve comments for
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Article not found
 */
commentRouter.get('/article/:articleId', (req, res) => commentController.getCommentsByArticleId(req, res));

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     description: Retrieves a single comment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to retrieve
 *     responses:
 *       200:
 *         description: Details of a comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
commentRouter.get('/:id', (req, res) => commentController.getCommentById(req, res));

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Creates a new comment for an article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input, data validation failed
 */
commentRouter.post('/', (req, res) => commentController.createComment(req, res));

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
commentRouter.delete('/:id', (req, res) => commentController.deleteComment(req, res));
