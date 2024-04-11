import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../entities/User';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public getAllUsers(): User[] {
        return this.userRepository.findAll();
    }

    public getUserById(id: string): User | undefined {
        return this.userRepository.findById(id);
    }

    public createUser(user: User): User {
        return this.userRepository.save(user);
    }

    public deleteUser(id: string): void {
        this.userRepository.delete(id);
    }
}