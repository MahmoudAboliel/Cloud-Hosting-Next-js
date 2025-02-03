import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
// import Link from "next/link";
import { getComments } from "@/apiCalls/articleApiCall";
import DeleteCommentBtn from "@/components/comments/DeleteCommentBtn";

const AdminComentsPage = async () => {
  const cookie = await cookies();
  const token = cookie.get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const comments: Comment[] = await getComments(token); 
  
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
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {comments.map(comment => 
              <tr key={comment.id} className="border-t border-b border-gray-400">
                <td className="py-3">{comment.text}</td>
                <td className="py-3">{new Date(comment.createdAt).toDateString()}</td>
                <td className="py-3 space-x-2">
                  <DeleteCommentBtn commentId={comment.id} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminComentsPage