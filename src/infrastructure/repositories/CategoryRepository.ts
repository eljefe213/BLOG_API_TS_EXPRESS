import { db } from "../data";
import { categories } from "../data/schema";
import { Category } from "../../domain/entities/Category";
import { eq } from "drizzle-orm";


/**
 * Repository qui gère le CRUD des catégories
 */
export class CategoryRepository {
    /**
     * Récupère toutes les catégories
     */
    async findAll(): Promise<Category[]> {
        try {
            return await db.query.categories.findMany();
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer les catégories");
        }
    }

    /**
     * Récupère une catégorie en fonction de son id
     */
    async findById(id: string): Promise<Category | undefined> {
        try {
            return await db.query.categories.findFirst({
                where: eq(categories.id, id)
            });
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer la catégorie");
        }
    }

    /**
     * Crée une nouvelle catégorie
     */
    async save(comment: Comment): Promise<Comment> {
        try {
            await db.insert(comments).values(comment).execute();
            return comment;
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de sauvegarder le commentaire");
        }
    }

    /**
     * Met à jour une catégorie
     */
    async update(category: Category): Promise<void> {
        try {
            await db.update(categories)
                .set(category)
                .where(
                    eq(categories.id, category.id)
                ).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de mettre à jour la catégorie");
        }
    }

    /**
     * Supprime une catégorie
     */
    async delete(id: string): Promise<void> {
        try {
            await db.delete(categories).where(
                eq(categories.id, id)
            ).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de supprimer la catégorie");
        }
    }
}
