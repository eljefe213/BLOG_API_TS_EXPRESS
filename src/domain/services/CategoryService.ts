import { CategoryRepository } from '../../infrastructure/repositories/CategoryRepository';
import { Category } from '../entities/Category';

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public getAllCategories(): Category[] {
        return this.categoryRepository.findAll();
    }

    public getCategoryById(id: string): Category | undefined {
        return this.categoryRepository.findById(id);
    }

    public createCategory(category: Category): Category {
        return this.categoryRepository.save(category);
    }

    public deleteCategory(id: string): void {
        this.categoryRepository.delete(id);
    }
}