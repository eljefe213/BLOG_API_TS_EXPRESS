import { Category } from '../../domain/entities/Category';

export class CategoryRepository {
    private categories: Category[] = [];

    public findAll(): Category[] {
        return this.categories;
    }

    public findById(id: string): Category | undefined {
        return this.categories.find(category => category.id === id);
    }

    public save(category: Category): Category {
        this.categories.push(category);
        return category;
    }

    public delete(id: string): void {
        this.categories = this.categories.filter(category => category.id !== id);
    }
}