import AddComment from "@/components/forms/AddComment";
import CommentItem from "@/components/articles/CommentItem";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { SingleArticle } from "@/utils/types";
import { cookies } from 'next/headers';
import { verifyTokenPage } from '@/utils/verifyToken';
import Link from "next/link";

interface SingleArticleProps {
    params: Promise<{ id: string }>
}

const SingleArticlePage = async ({params}:SingleArticleProps) => {

    const cookie = await cookies();
    const token = cookie.get("jwtToken")?.value || "";
    const payload = verifyTokenPage(token);
    
    
    const article:SingleArticle = await getSingleArticle((await params).id);
    
    return (
    <section className="px-5 pt-8 w-full md:w-3/4 container m-auto">
        <div className="bg-white shadow shadow-slate-500 rounded-lg p-7">
            <h1 className="text-2xl font-bold leading-tight">{article.title}</h1>
            <p className="text-gray-400 my-3">
                {new Date(article.createdAt).toDateString()}
            </p>
            <p className="text-gray-800 text-lg font-normal leading-tight">{article.description}</p>
        </div>
        <div className="my-2">
            {payload ? (
                <AddComment articleId={(await params).id} />
            ) : (
                <Link href='/login' className="text-xl text-blue-500 hover:underline">To write comment you should be login first</Link>
            )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Comments</h2>
        {article.comments.map(comment => 
            <CommentItem key={comment.id} comment={comment} userId={payload?.id} />

        )}
        
    </section>
  );
}

export default SingleArticlePage;