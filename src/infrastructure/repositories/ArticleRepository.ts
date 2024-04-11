import fs from 'fs';
import path from 'path';
import { Article } from '../../domain/entities/Article';

export class ArticleRepository {
  private articles: Article[];

  constructor() {
    // Le chemin peut varier en fonction de la structure exacte de ton projet
    const dataPath = path.join(__dirname, '../data/articles.json');
    this.articles = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  public findAll(): Article[] {
    return this.articles;
  }

  public findById(id: string): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  public save(article: Article): Article {
    this.articles.push(article);
    this.saveToFile();
    return article;
  }

  public delete(id: string): void {
    this.articles = this.articles.filter(article => article.id !== id);
    this.saveToFile();
  }

  private saveToFile() {
    const dataPath = path.join(__dirname, '../data/articles.json');
    try {
        fs.writeFileSync(dataPath, JSON.stringify(this.articles, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving articles to file:', error);
    }
}
}
