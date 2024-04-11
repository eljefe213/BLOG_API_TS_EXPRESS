import { Request, Response } from 'express';
import { ArticleService } from '../../../domain/services/ArticleService';
import { apiResponse } from '../../../utils/apiResponse';

export class ArticleController {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    public getAllArticles(req: Request, res: Response): void {
        const articles = this.articleService.getAllArticles();
        res.json(apiResponse(articles));
    }

    public getArticleById(req: Request, res: Response): void {
        const { id } = req.params;
        const article = this.articleService.getArticleById(id);
        if (article) {
            res.json(apiResponse(article));
        } else {
            res.status(404).json(apiResponse(null, 'Article not found', false));
        }
    }

    public createArticle(req: Request, res: Response): void {
        const { title, content, authorId, categoryId } = req.body;
        if (!title || !content || !authorId || !categoryId) {
            res.status(400).json(apiResponse(null, "Missing required fields", false));
            return;
        }
        const article = this.articleService.createArticle(req.body);
        res.status(201).json(apiResponse(article));
    }

    public deleteArticle(req: Request, res: Response): void {
        const { id } = req.params;
        this.articleService.deleteArticle(id);
        res.status(204).send();
    }
}