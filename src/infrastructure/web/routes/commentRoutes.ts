import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { CommentService } from '../../../domain/services/CommentService';
import { CommentRepository } from '../../../infrastructure/repositories/CommentRepository';

export const commentRouter = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

// Définition des routes pour les commentaires
commentRouter.get('/:articleId', (req, res) => commentController.getCommentsByArticleId(req, res));
commentRouter.get('/:id', (req, res) => commentController.getCommentById(req, res));
commentRouter.post('/', (req, res) => commentController.createComment(req, res));
commentRouter.delete('/:id', (req, res) => commentController.deleteComment(req, res));