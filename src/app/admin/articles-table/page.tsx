import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenPage } from "@/utils/verifyToken";
import Link from "next/link";
import { Article } from "@prisma/client";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import Pagination from "@/components/articles/Pagination";
import DeleteArticleBtn from "@/components/articles/DeleteArticleBtn";

interface AdminArticlesPageProps {
  searchParams: Promise<{ pageNumber: string }>
}

const AdminArticlesPage = async ({ searchParams }: AdminArticlesPageProps) => {
  const { pageNumber } = await searchParams;

  const cookie = await cookies();
  const token = cookie.get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const articles:Article[] = await getArticles(pageNumber);
  const count:number = await getArticlesCount();
  const pages:number = Math.ceil(count / ARTICLE_PER_PAGE);
  

  return (
    <section className="p-5 container mx-auto">
      <h1 className="text-2xl font-semibold ">Articles</h1>
      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px] my-5 text-left border-spacing-0">
          <thead className="border-t-2 border-b-2 border-gray-700 text-lg">
            <tr className="">
              <th className="py-1">Title</th>
              <th className="py-1">Created At</th>
              <th className="py-1">Actions</th>
              <th className="py-1"></th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {articles.map(article => 
              <tr key={article.id} className="border-t border-b border-gray-400">
                <td className="py-3">{article.title}</td>
                <td className="py-3">{new Date(article.createdAt).toDateString()}</td>
                <td className="py-3 space-x-2">
                  <Link 
                    href={`/admin/articles-table/edit/${article.id}`} 
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md font-medium"
                  >Edit</Link>
                  <DeleteArticleBtn articleId={article.id} />
                </td>
                <td className="py-3">
                  <Link href={`/articles/${article.id}`}
                        className="bg-blue-600 text-white py-1 px-2 rounded-md font-medium"
                  >
                    Read More
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination 
        pages={pages} 
        pageNumber={parseInt(pageNumber)} 
        route="/admin/articles-table" 
      />
    </section>
  )
}

export default AdminArticlesPage