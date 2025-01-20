import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenPage } from "@/utils/verifyToken";
import Navbar from "./home/Navbar";
import LogoutBtn from "./home/LogoutBtn";

const Header = async () => {

    const cookie = await cookies();
    const token = cookie.get("jwtToken")?.value || "";
    const payload = verifyTokenPage(token);

  return (
    <header className="relative h-[100px] bg-[rgb(227,225,255)] border-b-4 border-b-[rgb(144,144,144)] flex items-center justify-between px-10">
        <Navbar isAdmin={payload?.isAdmin || false} />
        {payload
            ? (<div className="flex items-center space-x-2">
                <strong 
                    className="text-xl font-bold text-blue-600" 
                    >{payload.name}
                </strong>
                <LogoutBtn />
            </div>)
            : (<div className="space-x-2">
                <Link 
                    className="bg-blue-500 hover:bg-blue-600 duration-500 text-white py-1 px-2 text-lg font-semibold rounded-md" 
                    href='/login'>Login</Link>
                <Link
                    className="bg-blue-500 hover:bg-blue-600 duration-500 text-white py-1 px-2 text-lg font-semibold rounded-md"
                    href='/register'>Register</Link>
            </div>)
        }
    </header>
  );
}

export default Header;