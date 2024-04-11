import { User } from '../../domain/entities/User';

export class UserRepository {
    private users: User[] = [];

    public findAll(): User[] {
        return this.users;
    }

    public findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    public findById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    public save(user: User): User {
        this.users.push(user);
        return user;
    }

    public delete(id: string): void {
        this.users = this.users.filter(user => user.id !== id);
    }
}