import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
} from "lucide-react";
import { menuItems } from "./menuItems";
import { useSelector } from "react-redux";

function Menu({ activeView, setActiveView }) {
  const userRole = useSelector((state) => state.auth?.user?.role || "Admin");

  return (
    <ul className="space-y-1">
      {menuItems
        .filter((item) => item.accessRole.includes(userRole) && item.id !== "profile")
        .map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all ${isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
    </ul>
  );
}

export default Menu;
