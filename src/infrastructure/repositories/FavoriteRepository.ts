import { db } from "../data";
import { favories, users, posts } from "../data/schema";
import { Favorite, NewFavorite } from "../../domain/entities/Favorite";
import { eq, and } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des favoris
 */
export class FavoriteRepository {

    /**
     * Récupère tous les favoris
     */
    async getAllFavorites(): Promise<Favorite[]> {
        try {
            return await db.query.favories.findMany({
                with: {
                    user: {
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
            throw new Error('Impossible de récupérer les favoris');
        }
    }

    /**
     * Récupère un favori en fonction de son id
     */
    async getFavoriteById(id: string): Promise<Favorite | undefined> {
        try {
            return await db.query.favories.findFirst({
                where: eq(favories.id, id),
                with: {
                    user: {
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
            throw new Error('Impossible de récupérer le favori');
        }
    }

    /**
     * Crée un nouveau favori
     */
    async createFavorite(favorite: NewFavorite): Promise<void> {
        try {
            await db.insert(favories).values(favorite).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer le favori');
        }
    }

    /**
     * Supprime un favori en fonction de son id et de l'id de l'utilisateur
     */
    async deleteFavoriteById(id: string, userId: string): Promise<void> {
        try {
            await db.delete(favories)
                .where(
                    and(
                        eq(favories.id, id),
                        eq(favories.userId, userId)
                    )
                )
                .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer le favori');
        }
    }
}
