import Link from 'next/link';
import { Article } from '@prisma/client';

interface ArticleItemProps {
    article:Article;
    className: string;
}

const ArticleItem = ({ article, className }:ArticleItemProps) => {
  return (
    <div className={`border-2 border-gray-400 rounded-lg shadow-lg hover:bg-slate-200 p-5 ${className}`}>
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{article.title}</h3>
        <p className="text-xl my-2 text-gray-700 leading-tight line-clamp-1">{article.description}</p>
        <Link 
            href={`/articles/${article.id}`}
            className="bg-purple-700 hover:bg-purple-900 text-xl text-white rounded-lg w-full block text-center py-2 px-4 mt-2"
        >Read More</Link>
    </div>
  )
}

export default ArticleItem