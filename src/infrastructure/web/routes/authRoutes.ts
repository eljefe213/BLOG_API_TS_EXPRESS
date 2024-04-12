import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     description: Logs in a user by using their username and password to return an authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Authentication successful, token is returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for accessing protected routes
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the login failed
 *                   example: "Invalid username or password"
 */
authRouter.post('/login', (req, res) => authController.login(req, res));

export { authRouter };
