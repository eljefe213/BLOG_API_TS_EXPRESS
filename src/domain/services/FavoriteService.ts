import { FavoriteRepository } from '../../infrastructure/repositories/FavoriteRepository';
import { Favorite, NewFavorite } from '../entities/Favorite';

export class FavoriteService {
    private favoriteRepository: FavoriteRepository;

    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    async getAllFavorites(): Promise<Favorite[]> {
        try {
            return await this.favoriteRepository.getAllFavorites();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer tous les favoris");
        }
    }

    async getFavoriteById(id: string): Promise<Favorite | undefined> {
        try {
            return await this.favoriteRepository.getFavoriteById(id);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer le favori");
        }
    }

    async createFavorite(favorite: NewFavorite): Promise<void> {
        try {
            await this.favoriteRepository.createFavorite(favorite);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer le favori");
        }
    }

    async deleteFavoriteById(id: string, userId: string): Promise<void> {
        try {
            await this.favoriteRepository.deleteFavoriteById(id, userId);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de supprimer le favori");
        }
    }
}
