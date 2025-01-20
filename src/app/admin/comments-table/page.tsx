import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenPage } from "@/utils/verifyToken";

const AdminComentsPage = async () => {
  const cookie = await cookies();
  const token = cookie.get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenPage(token);
  if (payload?.isAdmin === false) redirect("/");
  
  return (
    <div>AdminComentsPage</div>
  )
}

export default AdminComentsPage