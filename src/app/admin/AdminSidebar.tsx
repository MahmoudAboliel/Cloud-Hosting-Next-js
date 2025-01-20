import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <div>
        <Link href='/admin' className="flex items-center justify-center">
            <CgMenuGridR /> 
            <p className="hidden lg:block">Dashboard</p>
        </Link>
        <div className="mt-10 flex flex-col items-center lg:items-start gap-5">
            <Link href='/admin/articles-table' className="w-fit flex items-center gap-2 lg:border-b border-gray-300 hover:text-yellow-200 transition">
                <MdOutlineArticle />
                <p className="hidden lg:block">Articles</p>
            </Link>
            <Link href='/admin/comments-table' className="w-fit flex items-center gap-2 lg:border-b border-gray-300 hover:text-yellow-200 transition">
                <FaRegComments />
                <p className="hidden lg:block">Comments</p>
            </Link>
        </div>
    </div>
  )
}

export default AdminSidebar