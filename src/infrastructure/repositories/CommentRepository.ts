import { Comment } from '../../domain/entities/Comment';

export class CommentRepository {
    private comments: Comment[] = [];

    public findAll(): Comment[] {
        return this.comments;
    }

    public findByArticleId(articleId: string): Comment[] {
        return this.comments.filter(comment => comment.articleId === articleId);
    }

    public findById(id: string): Comment | undefined {
        return this.comments.find(comment => comment.id === id);
    }

    public save(comment: Comment): Comment {
        this.comments.push(comment);
        return comment;
    }

    public delete(id: string): void {
        this.comments = this.comments.filter(comment => comment.id !== id);
    }
}