import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import type { ChildrenProps } from "../types/common";
import { LogOut, LogIn, LayoutDashboard, Receipt, Users, Menu, X } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }: ChildrenProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 left-4 z-20 p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
        >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      <div className="w-64 bg-black text-white p-6 flex flex-col justify-between">
        
        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Finance<span className="text-blue-500">DO</span>
          </h2>

          <nav className="flex flex-col space-y-4">
            <Link to="/dashboard" className={`block ${
    location.pathname === "/dashboard"
      ? "text-blue-400"
      : "text-zinc-400"
  }`}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/records" className={`block ${
    location.pathname === "/records"
      ? "text-blue-400"
      : "text-zinc-400"
  }`}>
              <Receipt size={18} /> Records
            </Link>
            <Link to="/users" className={`block ${
    location.pathname === "/users"
      ? "text-blue-400"
      : "text-zinc-400"
  }`}>
              <Users size={18} /> Users
            </Link>
          </nav>
        </div>

      {/* logout section */}
        <div className="pt-6 border-t border-gray-800">
          {token ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
       {/* Main Section */}
      <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}