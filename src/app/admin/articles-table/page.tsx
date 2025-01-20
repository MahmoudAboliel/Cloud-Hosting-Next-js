import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenPage } from "@/utils/verifyToken";

const AdminArticlesPage = async () => {
  const cookie = await cookies();
  const token = cookie.get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenPage(token);
  if (payload?.isAdmin === false) redirect("/");

  return (
    <div>AdminArticlesPage</div>
  )
}

export default AdminArticlesPage