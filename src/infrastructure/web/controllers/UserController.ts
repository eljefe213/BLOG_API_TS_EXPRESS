import { Request, Response } from 'express';
import { UserService } from '../../../domain/services/UserService';
import { apiResponse } from '../../../utils/apiResponse';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public getAllUsers(req: Request, res: Response): void {
        const users = this.userService.getAllUsers();
        res.json(apiResponse(users));
    }

    public getUserById(req: Request, res: Response): void {
        const { id } = req.params;
        const user = this.userService.getUserById(id);
        if (user) {
            res.json(apiResponse(user));
        } else {
            res.status(404).json(apiResponse(null, 'User not found', false));
        }
    }

    public createUser(req: Request, res: Response): void {
        const user = this.userService.createUser(req.body);
        res.status(201).json(apiResponse(user));
    }

    public deleteUser(req: Request, res: Response): void {
        const { id } = req.params;
        this.userService.deleteUser(id);
        res.status(204).send();
    }
}