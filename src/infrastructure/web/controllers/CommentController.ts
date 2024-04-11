import { Request, Response } from 'express';
import { CommentService } from '../../../domain/services/CommentService';
import { apiResponse } from '../../../utils/apiResponse';

export class CommentController {
    private commentService: CommentService;

    constructor(commentService: CommentService) {
        this.commentService = commentService;
    }

    public getCommentsByArticleId(req: Request, res: Response): void {
        const { articleId } = req.params;
        const comments = this.commentService.getCommentsByArticleId(articleId);
        res.json(apiResponse(comments));
    }

    public getCommentById(req: Request, res: Response): void {
        const { id } = req.params;
        const comment = this.commentService.getCommentById(id);
        if (comment) {
            res.json(apiResponse(comment));
        } else {
            res.status(404).json(apiResponse(null, 'Comment not found', false));
        }
    }

    public createComment(req: Request, res: Response): void {
        const comment = this.commentService.createComment(req.body);
        res.status(201).json(apiResponse(comment));
    }

    public deleteComment(req: Request, res: Response): void {
        const { id } = req.params;
        this.commentService.deleteComment(id);
        res.status(204).send();
    }
}