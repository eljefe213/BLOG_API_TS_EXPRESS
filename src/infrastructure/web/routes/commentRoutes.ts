import express from 'express';
import { createComment, deleteCommentById, getCommentsByPostId } from '../../../infrastructure/web/controllers/CommentController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/:id', getCommentsByPostId);    // GET /comments/:id
router.delete('/:id', isAuthenticated, deleteCommentById);   // DELETE /comments/:id
router.post('/:postId', isAuthenticated, createComment); // POST /comments/:postId

export default router;