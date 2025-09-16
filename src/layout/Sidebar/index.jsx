


import React, { useState } from "react";
import { connect } from "react-redux";
import {
  BarChart3,
  Search,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

function Sidebar({ userRole, onLogoutClick }) {
  const navigate = useNavigate();

  const userName = "Amarendra Routray";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <>
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col top-0 flex-shrink-0 sticky">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">CRM</h1>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <nav className="px-3 flex-1 overflow-y-auto">
          <Menu userRole={userRole} />
        </nav>

        {/* Footer → pinned at bottom */}
        <div className="px-4 pb-4">
          <div className="max-w-xs rounded-xl shadow bg-gray-50 font-sans">
            <div className="p-1">
              <div 
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 p-2 hover:bg-gray-200 transition-colors rounded-md cursor-pointer">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-700 text-white text-lg font-semibold">
                  {userInitial}
                </div>
                <span className="font-semibold text-gray-800 truncate">{userName}</span>
              </div>
            </div>

            <div className="p-1">
              <div className="mt-1 bg-red-50 rounded-lg hover:rounded-lg">
                <button
                  onClick={onLogoutClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-700 hover:bg-red-100 hover:rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userRole: state.auth?.user?.role || "Admin",
});

export default connect(mapStateToProps)(Sidebar);
