import { Request, Response } from 'express';
import { FavoriteService } from '../../../domain/services/FavoriteService';
import { response } from '../../../utils/response';

import { FavoriteRepository } from '../../repositories/FavoriteRepository'; 

const favoriteRepository = new FavoriteRepository();

const favoriteService = new FavoriteService(favoriteRepository);

export const getAllFavorites = async (req: Request, res: Response) => {
    try {
        const favorites = await favoriteService.getAllFavorites();
        response(res, { statusCode: 200, message: 'OK', data: favorites });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const getFavoriteById = async (req: Request, res: Response) => {
    try {
        const favoriteId = req.params.id;
        const favorite = await favoriteService.getFavoriteById(favoriteId);
        if (!favorite) {
            response(res, { statusCode: 404, message: 'Favorite not found' });
        } else {
            response(res, { statusCode: 200, message: 'OK', data: favorite });
        }
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const createFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, postId } = req.body;
        if (!userId || !postId) {
            return response(res, { statusCode: 400, message: 'UserId and postId are required' });
        }

        await favoriteService.createFavorite({
            userId,
            postId
        });
        response(res, { statusCode: 201, message: 'Favorite created' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};

export const deleteFavoriteById = async (req: Request, res: Response) => {
    try {
        const favoriteId = req.params.id;
        const userId = req.body.userId; // Supposons que l'ID de l'utilisateur soit passé dans le corps de la requête
        await favoriteService.deleteFavoriteById(favoriteId, userId);
        response(res, { statusCode: 200, message: 'Favorite deleted' });
    } catch (error) {
        console.error(error);
        response(res, { statusCode: 500, message: 'Internal server error' });
    }
};
