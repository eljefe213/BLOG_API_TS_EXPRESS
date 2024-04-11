import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthController {
    public login(req: Request, res: Response) {
        const { username, password } = req.body;

        // Simuler une vérification de l'utilisateur
        if (username === 'admin' && password === 'password') {
            // Assurer que la clé secrète JWT est définie
            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET is not defined.');
                res.status(500).send({ message: 'Internal server error' });
                return;
            }
            const token = jwt.sign({ userId: '1', username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    }
}
