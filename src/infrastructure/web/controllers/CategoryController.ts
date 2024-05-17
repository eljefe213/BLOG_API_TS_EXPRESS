import { Request, Response } from 'express';
import { CategoryService } from '../../../domain/services/CategoryService';
import { response } from '../../../utils/response';
import { CategoryRepository } from '../../repositories/CategoryRepository'; 

// Créez une instance de CategoryRepository
const categoryRepository = new CategoryRepository();

// Passez l'instance de CategoryRepository à CategoryService lors de son instanciation
const categoryService = new CategoryService(categoryRepository);

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        response(res, { statusCode: 200, message: 'OK', data: categories });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            response(res, { statusCode: 404, message: 'Category not found' });
        } else {
            response(res, { statusCode: 200, message: 'OK', data: category });
        }
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return response(res, { statusCode: 400, message: 'Name is required' });
        }

        await categoryService.createCategory({
            name,
            postId: ''
        });
        response(res, { statusCode: 201, message: 'Category created' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        if (!name) {
            return response(res, { statusCode: 400, message: 'Name is required' });
        }

        await categoryService.updateCategory({
            id: categoryId, name,
            postId: ''
        });
        response(res, { statusCode: 200, message: 'Category updated' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        await categoryService.deleteCategoryById(categoryId);
        response(res, { statusCode: 200, message: 'Category deleted' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};
