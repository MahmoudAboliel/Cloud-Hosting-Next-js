import AdminSidebar from "./AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is Admin Dashboard",
};

interface AdminDashboardLayoutProps {
    children: React.ReactNode
}
const AdminDashboardLayout = ({children}:AdminDashboardLayoutProps) => {
  return (
    <main className="h-[calc(100vh-150px)] flex justify-between">
        <div className="bg-purple-600 text-white h-full w-14 lg:w-1/5 p-1 lg:p-5 pt-5 text-xl">
            <AdminSidebar />
        </div>
        <div className="w-full">
            {children}
        </div>
    </main>
  )
}

export default AdminDashboardLayout