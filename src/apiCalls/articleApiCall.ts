import { Article, Comment } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SingleArticle } from '@/utils/types';

export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`, 
    {
      cache: 'no-store',
      // update data every 50 second
      // next: {revalidate: 50}
    });
  if (!response.ok)
    throw new Error("Faild to Fetch Articles");
  
  return response.json();
}

export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, { cache: 'no-store' });
  if (!response.ok)
    throw new Error("Faild to Featch Articles Count");

  const { count } = await response.json() as { count: number };

  return count;
}

export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`,
        {cache: 'no-store'}
    );
    if (!response.ok)
        throw new Error("Fetch article faild");
    
    return response.json();
}

export async function getArticlesBasedOnSearch(searchText: string | undefined): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`, 
    {
      cache: 'no-store',
      // update data every 50 second
      // next: {revalidate: 50}
    });
  if (!response.ok)
    throw new Error("Faild to Fetch Articles");
  
  return response.json();
}

export async function getComments(token: string): Promise<Comment[]> {
  const response = await fetch(
    `${DOMAIN}/api/comments`, 
    {
      cache: 'no-store',
      // update data every 50 second
      // next: {revalidate: 50}
      headers: {
        Cookie: `jwtToken=${token}`
      }
    });
  if (!response.ok)
    throw new Error("Faild to Fetch Comments");
  
  return response.json();
}