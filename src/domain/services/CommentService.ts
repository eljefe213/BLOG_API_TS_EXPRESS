import { CommentRepository } from '../../infrastructure/repositories/CommentRepository';
import { Comment } from '../entities/Comment';

export class CommentService {
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository) {
        this.commentRepository = commentRepository;
    }

    public getCommentsByArticleId(articleId: string): Comment[] {
        return this.commentRepository.findByArticleId(articleId);
    }

    public getCommentById(id: string): Comment | undefined {
        return this.commentRepository.findById(id);
    }

    public createComment(comment: Comment): Comment {
        return this.commentRepository.save(comment);
    }

    public deleteComment(id: string): void {
        this.commentRepository.delete(id);
    }
}