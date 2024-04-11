import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';

export class AuthService {
    public generateToken(user: User): string {
        return jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
    }

    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}