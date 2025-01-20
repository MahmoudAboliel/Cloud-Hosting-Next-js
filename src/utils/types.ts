import { Article, Comment, User } from '@prisma/client';

export type JWTPayload = {
    id: string;
    isAdmin: boolean;
    name: string
};

export type CommentWithUser = Comment & { user: User };

export type SingleArticle = Article & { comments: CommentWithUser[] };