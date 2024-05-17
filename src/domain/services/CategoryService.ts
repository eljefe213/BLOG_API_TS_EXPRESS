import { CategoryRepository } from '../../infrastructure/repositories/CategoryRepository';
import { Category, NewCategory } from '../entities/Category';

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            return await this.categoryRepository.getAllCategories();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer toutes les catégories");
        }
    }

    async getCategoryById(id: string): Promise<Category | undefined> {
        try {
            return await this.categoryRepository.getCategoryById(id);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer la catégorie");
        }
    }

    async createCategory(category: NewCategory): Promise<void> {
        try {
            await this.categoryRepository.createCategory(category);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer la catégorie");
        }
    }

    async updateCategory(category: Category): Promise<void> {
        try {
            await this.categoryRepository.updateCategory(category);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de mettre à jour la catégorie");
        }
    }

    async deleteCategoryById(id: string): Promise<void> {
        try {
            await this.categoryRepository.deleteCategoryById(id);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de supprimer la catégorie");
        }
    }
}
