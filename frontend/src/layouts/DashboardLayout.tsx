import { Link } from "react-router-dom";
import type { ChildrenProps } from "../types/common";

export default function DashboardLayout({ children }: ChildrenProps) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Finance</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/records">Records</Link>
        <Link to="/users">Users</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}