import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@prisma/client";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import type { Metadata } from "next";
import { ARTICLE_PER_PAGE } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles About Programming",
};

interface ArticlesPageProps {
  searchParams: Promise<{ pageNumber: string }>
}



const Articles = async ({ searchParams }:ArticlesPageProps) => {
  
  // delay 10s
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  const { pageNumber } = await searchParams;
  const articles:Article[] = await getArticles(pageNumber);
  const count:number = await getArticlesCount();
  const pages:number = Math.ceil(count / ARTICLE_PER_PAGE);
  
  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="h-3/4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-2 gap-2">
      {articles.map(article => (
        <ArticleItem 
          className="w-full"
          key={article.id} 
          article={article} />
      ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages} />
    </section>
  );
}

export default Articles;