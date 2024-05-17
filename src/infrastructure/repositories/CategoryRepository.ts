import { db } from "../data";
import { categories } from "../data/schema";
import { Category, NewCategory } from "../../domain/entities/Category";
import { eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des catégories
 */
export class CategoryRepository {

    /**
     * Récupère toutes les catégories
     */
    async getAllCategories(): Promise<Category[]> {
        try {
            return await db.query.categories.findMany();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les catégories');
        }
    }

    /**
     * Récupère une catégorie en fonction de son id
     */
    async getCategoryById(id: string): Promise<Category | undefined> {
        try {
            return await db.query.categories.findFirst({
                where: eq(categories.id, id),
            });
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer la catégorie');
        }
    }

    /**
     * Crée une nouvelle catégorie
     */
    async createCategory(category: NewCategory): Promise<void> {
        try {
            await db.insert(categories).values(category).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer la catégorie');
        }
    }

    /**
     * Met à jour une catégorie
     */
    async updateCategory(category: Category): Promise<void> {
        try {
            await db.update(categories)
                .set(category)
                .where(eq(categories.id, category.id))
                .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de mettre à jour la catégorie');
        }
    }

    /**
     * Supprime une catégorie en fonction de son id
     */
    async deleteCategoryById(id: string): Promise<void> {
        try {
            await db.delete(categories)
                .where(eq(categories.id, id))
                .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer la catégorie');
        }
    }
}
