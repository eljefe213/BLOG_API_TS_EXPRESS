require('dotenv').config();
import express from 'express';
import { articleRouter } from './infrastructure/web/routes/articleRoutes';
import { categoryRouter } from './infrastructure/web/routes/categoryRoutes';
import { userRouter } from './infrastructure/web/routes/userRoutes';
import { commentRouter } from './infrastructure/web/routes/commentRoutes';
import { authRouter } from './infrastructure/web/routes/authRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

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
});

export default app;