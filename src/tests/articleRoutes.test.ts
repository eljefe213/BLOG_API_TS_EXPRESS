import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import request from 'supertest';
import app from '../app';  

describe('Article Routes', () => {
  it('GET /articles - should return all articles', async () => {
    const response = await request(app).get('/articles');
    expect(response.statusCode).toBe(200);
    expect(response.body.articles).toBeInstanceOf(Array); 
});

  it('POST /articles - should create an article', async () => {
    const newArticle = {
      title: 'New Test Article',
      content: 'Test content',
      authorId: '1',
      categoryId: '1'
    };
    const response = await request(app).post('/articles').send(newArticle);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toEqual(newArticle.title);
  });
});