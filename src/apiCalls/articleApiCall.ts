import { Article } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SingleArticle } from '@/utils/types';

export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`, 
    {
      cache: 'force-cache',
      // update data every 50 second
      // next: {revalidate: 50}
    });
  if (!response.ok)
    throw new Error("Faild to Fetch Articles");
  
  return response.json();
}

export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`);
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