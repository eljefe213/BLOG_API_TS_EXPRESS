import { Request, Response } from 'express';
import env from '../../../config/env';
import bcrypt from 'bcrypt';

import { UserRepository } from '../../repositories/UserRepository';
import { AuthService } from '../../../domain/services/AuthService';

import { response } from '../../../utils/response';
import { CustomRequest } from '../../../types/express';

const { NODE_ENV } = env;

const userRepo = new UserRepository();
const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // on récupère l'utilisateur avec l'username saisi dans le formulaire (req.body)
        const user = await userRepo.getUserByUsername(username, { id: true, username: true, password: true });
        if (!user)
            return response(res, { statusCode: 401, message: 'Authentication failed' });

        // On va comparer le mot de passe hashé (entre celui du formulaire et celui enregistré dans notre json)
        const isValid = await bcrypt.compare(password, user.password as string);
        if (!isValid)
            return response(res, { statusCode: 401, message: 'Authentication failed' });

        response(res, { statusCode: 200, message: 'Authentication successful' });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error' });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, confirmPassword } = req.body;
        
        if (!username?.trim() || !password?.trim() || !confirmPassword?.trim())
            return response(res, { statusCode: 400, message: 'Invalid username or password' });

        if (password !== confirmPassword)
            return response(res, { statusCode: 400, message: 'Passwords do not match' });

        // Vérification de l'unicité du nom d'utilisateur saisi
        const existingUsername = await userRepo.getUserByUsername(username, { username: true });
        if (existingUsername)
            return response(res, { statusCode: 409, message: 'Username already exists' });

        // hashage du mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        userRepo.createUser({
            username, password: hashedPassword,
            email: ''
        });
        response(res, {statusCode: 201, message: 'User created successfully'});
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    } 
}

export const me = async (req: CustomRequest, res: Response) => {
    try {
        // On récupère l'utilisateur stocké dans la session
        response(res, { statusCode: 200, message: 'OK', data: req.session?.user });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        // On supprime l'utilisateur de la session
        delete req.session?.user;
        response(res, { statusCode: 200, message: 'Logout successful' });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    }
}
