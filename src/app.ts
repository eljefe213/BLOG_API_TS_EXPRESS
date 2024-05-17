import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import env from './config/env';
import { requestLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import { refreshTokenMiddleware } from './middlewares/refreshToken';
import { initializeSocketServer } from './infrastructure/web/sockets/server';
import router from './infrastructure/web/routes';

import { articleRouter } from './infrastructure/web/routes/articleRoutes';
import { categoryRouter } from './infrastructure/web/routes/categoryRoutes';
import { userRouter } from './infrastructure/web/routes/userRoutes';
import { commentRouter } from './infrastructure/web/routes/commentRoutes';
import { authRouter } from './infrastructure/web/routes/authRoutes';
import { favoriteRouter } from './infrastructure/web/routes/favoriteRoutes'; 
import { eventRouter } from './infrastructure/web/routes/eventRoutes';  

const swaggerDocument = YAML.load('./swagger.yaml');

const { PORT, FRONTEND_URL } = env;

const app = express();
const server = http.createServer(app);
initializeSocketServer(server);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'],
}));

app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(requestLogger);
app.use(refreshTokenMiddleware);

function middleware1(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 1");
    next();
}

app.get("/", middleware1, (req: Request, res: Response) => {
    console.log("Ceci est un console log, qui ne sera JAMAIS affiché dans le navigateur, mais seulement le terminal du serveur (ici terminal vscode)");
    res.send("Hello World pas piqué des hannetons");
});

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Erreur de test pour montrer les mw d\'erreurs');
    next(error);
});

app.use(router);

// Ajout des routes spécifiques
app.use('/articles', articleRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);
app.use('/favorites', favoriteRouter);  // Ajout de cette ligne
app.use('/events', eventRouter);  // Ajout de cette ligne

app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
