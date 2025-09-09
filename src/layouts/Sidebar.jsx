import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  ShoppingCart,
  Package,
  LineChart,
  MessageSquare,
  Settings,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const menus = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { title: "Leaderboard", icon: <BarChart2 size={20} />, path: "/leaderboard" },
    { title: "Order", icon: <ShoppingCart size={20} />, path: "/orders" },
    { title: "Products", icon: <Package size={20} />, path: "/products" },
    { title: "Sales Report", icon: <LineChart size={20} />, path: "/sales-report" },
    { title: "Messages", icon: <MessageSquare size={20} />, path: "/messages" },
    { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { title: "Users", icon: <User size={20} />, path: "/users" },
    { title: "Branches", icon: <User size={20} />, path: "/branches" },
    { title: "Merchant", icon: <User size={20} />, path: "/merchant" },
    { title: "Sign Out", icon: <LogOut size={20} />, path: "/logout" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex">

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

     
      <div
        ref={sidebarRef}
        className={`${
          open ? "w-56" : "w-16"
        } bg-white dark:bg-gray-900 shadow-lg min-h-screen p-3 pt-6 duration-300 relative z-20`}
      >
        <ul className="space-y-2">
          {menus.map((menu, i) => (
            <li key={i}>
              <Link
                to={menu.path}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer duration-200 ${
                  location.pathname === menu.path
                    ? "bg-[#04526A] text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{menu.icon}</span>
                {open && (
                  <span
                    className={`${
                      location.pathname === menu.path
                        ? "font-medium"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {menu.title}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
