import AddNewArticle from "@/components/forms/AddNewArticle";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenPage } from "@/utils/verifyToken";

const AdminDashboard = async () => {

  const cookie = await cookies();
  const token = cookie.get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenPage(token);
  if (payload?.isAdmin === false) redirect("/");
  
  return (
    <section className="container m-auto h-full flex justify-center items-center">
      <div className="bg-purple-200 p-4 rounded-xl mx-2 shadow-md">
        <h2 className="text-xl lg:text-2xl font-semibold mb-3">Add New Article</h2>
        <AddNewArticle />
      </div>
    </section>
  );
}

export default AdminDashboard;