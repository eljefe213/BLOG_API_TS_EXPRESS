require('dotenv').config();
import env from "./config/env";
import cors from 'cors';
import express from 'express';
import { articleRouter } from './infrastructure/web/routes/articleRoutes';
import { categoryRouter } from './infrastructure/web/routes/categoryRoutes';
import { userRouter } from './infrastructure/web/routes/userRoutes';
import { commentRouter } from './infrastructure/web/routes/commentRoutes';
import { authRouter } from './infrastructure/web/routes/authRoutes';


const setupSwagger = require('../swaggerConfig'); 
const app = express();
const { PORT, FRONTEND_URL } = env;

// Configuration de Swagger
setupSwagger(app);

app.use(cors({
  origin: FRONTEND_URL, // Autoriser uniquement cette adresse à requêter sur le serveur
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées, les plus courantes, les autres seront bloquées
  credentials: true // Autoriser les cookies
}));

app.use(express.json()); // Middleware pour parser le JSON

// Routes pour chaque type d'entité
app.use('/articles', articleRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available on http://localhost:${PORT}/api-docs`);
});

