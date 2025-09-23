// import React, { useState, useEffect, useRef } from "react";
// import { Menu, Bell, User, BadgePlus, ChevronDown, Key, LogOut } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { toggleSidebar, toggleSidebarMobile } from "../../../store/slices/sidebarSlice";
// import { useNavigate } from "react-router-dom";
// import LogoutConfirm from "../../../modals/LogoutConfirm";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showLogout, setShowLogout] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     sessionStorage.clear();
//     setShowLogout(false);
//     navigate("/login", { replace: true });
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
//         <div className="flex items-center">
//           <button
//             onClick={() =>
//               window.innerWidth < 768
//                 ? dispatch(toggleSidebarMobile())
//                 : dispatch(toggleSidebar())
//             }
//             className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition"
//             aria-label="Toggle sidebar"
//           >
//             <Menu size={22} />
//           </button>


//           <h1 className="ml-4 text-xl font-semibold text-gray-800">CRM Pro</h1>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition">
//             <Bell size={20} />
//           </button>
//           <button className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition text-sm">
//             <BadgePlus size={18} />
//             <span className="hidden md:block">Quick Create</span>
//             <ChevronDown size={16} />
//           </button>
//           <div className="">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-2 px-2 py-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition"
//             >
//               <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
//                 <User size={16} />
//               </div>
//               <span className="hidden md:block font-medium text-gray-800">John Doe</span>
//               <ChevronDown size={16} />
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mr-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[60]">
//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => navigate("/change-password")}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Change Password
//                 </button>
//                 <hr />
//                 <button
//                   onClick={() => setShowLogout(true)}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 hover:rounded-b-lg"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>
//       <LogoutConfirm
//         open={showLogout}
//         onClose={() => setShowLogout(false)}
//         onConfirm={handleLogout}
//       />
//     </>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
import { 
  Menu, 
  Bell, 
  User, 
  BadgePlus, 
  ChevronDown, 
  UserPlus, 
  ClipboardList 
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar, toggleSidebarMobile } from "../../../store/slices/sidebarSlice";
import { useNavigate } from "react-router-dom";
import LogoutConfirm from "../../../modals/LogoutConfirm";
import Dropdown from "../Header/Dropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.clear();
    setShowLogout(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        {/* Sidebar Toggle */}
        <div className="flex items-center">
          <button
            onClick={() =>
              window.innerWidth < 768
                ? dispatch(toggleSidebarMobile())
                : dispatch(toggleSidebar())
            }
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">CRM Pro</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition">
            <Bell size={20} />
          </button>

          {/* Quick Create Dropdown */}
          <Dropdown
            align="right"
            trigger={(open) => (
              <button className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none transition text-sm">
                <BadgePlus size={18} />
                <span className="hidden md:block">Quick Create</span>
                <ChevronDown size={16} className={open ? "transform rotate-180" : ""} />
              </button>
            )}
          >
            {({ close }) => (
              <>
                <button
                  onClick={() => {
                    close();
                    navigate("");
                  }}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <UserPlus size={16} className="mr-2" />
                  Add Lead
                </button>
                <button
                  onClick={() => {
                    close();
                    navigate("");
                  }}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ClipboardList size={16} className="mr-2" />
                  Add Task
                </button>
              </>
            )}
          </Dropdown>

          {/* User Profile Dropdown */}
          <Dropdown
            align="right"
            trigger={(open) => (
              <button className="flex items-center gap-2 px-2 py-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none transition">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="hidden md:block font-medium text-gray-800">John Doe</span>
                <ChevronDown size={16} className={open ? "transform rotate-180" : ""} />
              </button>
            )}
          >
            {({ close }) => (
              <>
                <button
                  onClick={() => {
                    close();
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    close();
                    navigate("/change-password");
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Change Password
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    close();
                    setShowLogout(true);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition-colors rounded-b-lg"
                >
                  Logout
                </button>
              </>
            )}
          </Dropdown>
        </div>
      </header>

      {/* Logout Modal */}
      <LogoutConfirm
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
