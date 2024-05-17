import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User, NewUser, UserColumns } from '../entities/User';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<Partial<User>[]> {
        try {
            return await this.userRepository.getAllUsers();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer tous les utilisateurs");
        }
    }

    async getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return await this.userRepository.getUserById(id, columns);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    }

    async getUserByUsername(username: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return await this.userRepository.getUserByUsername(username, columns);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    }

    async createUser(user: NewUser): Promise<void> {
        try {
            await this.userRepository.createUser(user);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer l'utilisateur");
        }
    }

    async updateUser(user: User): Promise<void> {
        try {
            await this.userRepository.updateUser(user);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de mettre à jour l'utilisateur");
        }
    }
}
