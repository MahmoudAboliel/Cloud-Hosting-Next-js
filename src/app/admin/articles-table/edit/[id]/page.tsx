import { getSingleArticle } from "@/apiCalls/articleApiCall";
import EditArticleForm from "@/components/forms/EditArticle";
import { verifyTokenPage } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface EditArticlePageProps {
    params: Promise<{ id: string }>
}
const page = async ({ params }: EditArticlePageProps) => {

    const cookie = await cookies();
    const token = cookie.get("jwtToken")?.value;
    if (!token) redirect("/");
    const payload = verifyTokenPage(token);
    if (payload?.isAdmin === false) redirect("/");

    const article:Article = await getSingleArticle((await params).id);

    return (
        <section className="container m-auto h-full flex justify-center items-center">
        <div className="bg-purple-200 p-4 rounded-xl mx-2 shadow-md">
            <h2 className="text-xl lg:text-2xl font-semibold mb-3">Edit Article</h2>
                <EditArticleForm article={article} />
        </div>
        </section>
    )
}

export default page
