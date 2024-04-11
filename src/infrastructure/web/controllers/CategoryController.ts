import { Request, Response } from 'express';
import { CategoryService } from '../../../domain/services/CategoryService';
import { apiResponse } from '../../../utils/apiResponse';

export class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    public getAllCategories(req: Request, res: Response): void {
        const categories = this.categoryService.getAllCategories();
        res.json(apiResponse(categories));
    }

    public getCategoryById(req: Request, res: Response): void {
        const { id } = req.params;
        const category = this.categoryService.getCategoryById(id);
        if (category) {
            res.json(apiResponse(category));
        } else {
            res.status(404).json(apiResponse(null, 'Category not found', false));
        }
    }

    public createCategory(req: Request, res: Response): void {
        const category = this.categoryService.createCategory(req.body);
        res.status(201).json(apiResponse(category));
    }

    public deleteCategory(req: Request, res: Response): void {
        const { id } = req.params;
        this.categoryService.deleteCategory(id);
        res.status(204).send();
    }
}