import fs from 'fs';
import path from 'path';
import { Comment } from '../../domain/entities/Comment';

export class CommentRepository {
    private comments: Comment[] = [];

    constructor() {
        this.loadComments();
    }

    private loadComments(): void {
        try {
            const filePath = path.join(__dirname, '../data/comments.json');
            const fileData = fs.readFileSync(filePath, 'utf-8');
            this.comments = JSON.parse(fileData);
            console.log("Comments loaded:", this.comments);  // Affiche les commentaires chargés
        } catch (error) {
            console.error('Failed to load comments from file:', error);
        }
    }
    
    public findById(id: string): Comment | undefined {
        console.log("Searching for comment with ID:", id);  // Affiche l'ID recherché
        const comment = this.comments.find(comment => comment.id === id);
        console.log("Comment found:", comment);  // Affiche le commentaire trouvé ou undefined
        return comment;
    }

    public findAll(): Comment[] {
        return this.comments;
    }

    public findByArticleId(articleId: string): Comment[] {
        return this.comments.filter(comment => comment.articleId === articleId);
    }

    public save(comment: Comment): Comment {
        this.comments.push(comment);
        this.persistComments(); // Call this function if you decide to persist changes back to the file
        return comment;
    }

    public delete(id: string): void {
        this.comments = this.comments.filter(comment => comment.id !== id);
        this.persistComments(); // Call this function if you decide to persist changes back to the file
    }

    private persistComments(): void {
        try {
            const filePath = path.join(__dirname, '../data/comments.json');
            fs.writeFileSync(filePath, JSON.stringify(this.comments, null, 2), 'utf-8');
        } catch (error) {
            console.error('Failed to save comments to file:', error);
        }
    }
}
