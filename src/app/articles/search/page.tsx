import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";

interface SearchArticleProps {
  searchParams: Promise<{ searchText: string }>
}

const Search = async ({ searchParams }:SearchArticleProps) => {
  const { searchText } = await searchParams;
  const articles:Article[] = await getArticlesBasedOnSearch(searchText);
  
  return (
    <section className="container mx-auto p-5">
      {articles.length === 0 
      ? (
        <h1 className="text-2xl font-semibold">Articles based on 
          <span className="text-red-600 font-bold"> [{searchText}] </span>
          not found
        </h1>
        ) 
      : (
        <>
          <h1 className="text-2xl font-semibold">Articles based on :
            <span className="text-green-600 font-bold"> {searchText}</span>
          </h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {articles.map(article =>
              <ArticleItem 
                className="w-full"
                key={article.id} 
                article={article} />
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Search;