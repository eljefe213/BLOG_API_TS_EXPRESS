import { db } from "../data";
import { comments, posts, users } from "../data/schema";
import { Comment, NewComment, CommentColumns } from "../../domain/entities/Comment";
import { and, eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des commentaires
 */
export class CommentRepository {

    /**
     * Récupère tous les commentaires
     */
    async getAllComments(columns: CommentColumns = {}): Promise<Partial<Comment>[]> {
        try {
            return await db.query.comments.findMany({
                columns,
                with: {
                    author: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    post: {
                        columns: {
                            id: true,
                            title: true
                        }
                    }
                }
            });
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les commentaires');
        }
    }

    /**
     * Récupère un commentaire en fonction de son id
     */
    async getCommentById(id: string, columns: CommentColumns = {}): Promise<Partial<Comment> | undefined> {
        try {
            return await db.query.comments.findFirst({
                where: eq(comments.id, id),
                columns,
                with: {
                    author: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    post: {
                        columns: {
                            id: true,
                            title: true
                        }
                    }
                }
            });
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer le commentaire');
        }
    }

    /**
     * Crée un nouveau commentaire
     */
    async createComment(comment: NewComment): Promise<void> {
        try {
            await db.insert(comments).values(comment).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer le commentaire');
        }
    }

    /**
     * Supprime un commentaire en fonction de son id et de l'id de l'utilisateur
     */
    async deleteCommentById(id: string, userId: string): Promise<void> {
        try {
            await db.delete(comments).where(
                and(
                    eq(comments.id, id),
                    eq(comments.author, userId)
                )
            ).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer le commentaire');
        }
    }

    /**
     * Met à jour un commentaire
     */
    async updateComment(comment: Comment): Promise<void> {
        try {
            await db.update(comments)
                .set(comment)
                .where(eq(comments.id, comment.id))
                .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de mettre à jour le commentaire');
        }
    }
}
