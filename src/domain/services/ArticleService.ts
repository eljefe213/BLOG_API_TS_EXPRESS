import { ArticleRepository } from '../../infrastructure/repositories/PostRepository';
import { Article } from '../entities/Post';

export class ArticleService {
    private articleRepository:  ArticleRepository;

    constructor(articleRepository: ArticleRepository) {
        this.articleRepository = articleRepository;
    }

    public getAllArticles(): Article[] {
        return this.articleRepository.findAll();
    }

    public getArticleById(id: string): Article | undefined {
        try {
            return this.articleRepository.findById(id);
        } catch (error) {
            console.error('Error retrieving article:', error);
            return undefined;
        }
    }

    public createArticle(article: Article): Article {
        if (!article.title || !article.content || !article.authorId || !article.categoryId) {
            throw new Error('Missing required article fields');
        }
        return this.articleRepository.save(article);
    }

    public deleteArticle(id: string): void {
        this.articleRepository.delete(id);
    }
}