export interface Article {
    id: string;
    title: string;
    content: string;
    authorId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}