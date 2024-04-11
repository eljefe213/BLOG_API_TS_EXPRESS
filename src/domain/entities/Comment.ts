export interface Comment {
    id: string;
    articleId: string;
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}