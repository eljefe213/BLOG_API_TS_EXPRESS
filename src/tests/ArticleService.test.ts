import { ArticleService } from '../domain/services/PostService';
import { ArticleRepository } from '../infrastructure/repositories/PostRepository';
import { Article } from '../domain/entities/Post';  

describe('ArticleService', () => {
  let service: ArticleService;
  let repo: ArticleRepository;

  beforeEach(() => {
    repo = new ArticleRepository();
    service = new ArticleService(repo);
  });

  it('should create an article', async () => {
    const articleData: Article = { 
      id: 'temp-id',  // Ajoute un ID temporaire
      title: 'Test', 
      content: 'Content', 
      authorId: '1', 
      categoryId: '1',
      createdAt: new Date(), 
      updatedAt: new Date()
    };
    // Mock de la fonction save du repository pour retourner articleData
    repo.save = jest.fn().mockReturnValue(articleData);
    const article = await service.createArticle(articleData);
    expect(article).toEqual(articleData);
    expect(repo.save).toHaveBeenCalledWith(articleData);
  });
});