import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../../../domain/services/UserService';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';

export const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Définition des routes pour les utilisateurs
userRouter.get('/', (req, res) => userController.getAllUsers(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));