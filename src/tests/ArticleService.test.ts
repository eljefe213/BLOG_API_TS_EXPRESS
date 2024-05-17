import { PostService } from '../domain/services/PostService';
import { PostsRepository } from '../infrastructure/repositories/PostRepository';
import { Post } from '../domain/entities/Post';  

describe('PostService', () => {
  let service: PostService;
  let repo: PostRepository;

  beforeEach(() => {
    repo = new PostRepository();
    service = new PostService(repo);
  });

  it('should create an Post', async () => {
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