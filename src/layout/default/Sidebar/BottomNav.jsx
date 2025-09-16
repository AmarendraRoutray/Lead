import { Link, useLocation } from "react-router-dom";
import { Settings, Bell, LogOut } from "lucide-react";
import { menuItems } from "./menuItems";
import { useSelector } from "react-redux";

const BottomNav = ({ onLogoutClick }) => {
    const location = useLocation();
    const useRole = useSelector((state) => state.auth.user?.role || "Admin");

    const filteredMenuItems = menuItems.filter(
        item => item.accessRole?.includes(useRole)
    );

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-gray-200">
                {filteredMenuItems
                    .map(({ path, icon: Icon, label }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link key={path} to={path} title={label}>
                                <button
                                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                                w-12 h-12 rounded-full transition-all duration-200 
                                                ring-offset-background focus-visible:outline-none focus-visible:ring-2 
                                                focus-visible:ring-ring focus-visible:ring-offset-2
                                                disabled:pointer-events-none disabled:opacity-50 
                                                [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                                ${isActive
                                            ? "bg-primary text-white shadow-md hover:bg-[#1a73e8]/90"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                                        }`}
                                >
                                    <Icon className="h-5 w-5"/>
                                </button>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default BottomNav;




// import { Link, useLocation } from "react-router-dom";
// import { LogOut, User } from "lucide-react";
// import { menuItems } from "./menuItems";
// import { useSelector } from "react-redux";

// const BottomNav = ({ onLogoutClick }) => {
//   const location = useLocation();
//   const useRole = useSelector((state) => state.auth.user?.role || "Admin");
//   const filteredMenuItems = menuItems.filter(
//     (item) => item.accessRole?.includes(useRole)
//   );

//   const renderButton = (path, Icon) => {
//     const isActive = location.pathname === path;
//     return (
//       <Link key={path} to={path}>
//         <button
//           className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
//                       w-12 h-12 rounded-full transition-all duration-200 
//                       ring-offset-background focus-visible:outline-none focus-visible:ring-2 
//                       focus-visible:ring-ring focus-visible:ring-offset-2
//                       disabled:pointer-events-none disabled:opacity-50 
//                       [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
//                       ${
//                         isActive
//                           ? "bg-primary text-white shadow-md hover:bg-[#1a73e8]/90"
//                           : "text-gray-600 hover:bg-gray-100 hover:text-primary"
//                       }`}
//         >
//           <Icon className="h-5 w-5" />
//         </button>
//       </Link>
//     );
//   };

//   return (
//     <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 md:hidden">
//       <div 
//         className="relative bg-white/95 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-gray-200"
//       >
//         {/* Scroll container for left and right menu items */}
//         <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-hidden pr-24 max-w-full">
//           {/* Left & Right side buttons excluding profile */}
//           {filteredMenuItems.map(({ path, icon: Icon }) => renderButton(path, Icon))}

//           {/* Spacer to allow scrolling past profile */}
//           <div className="flex-shrink-0 w-14" />
//         </div>

//         {/* Profile button absolutely centered */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <Link to="/profile">
//             <button
//               className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
//                           w-14 h-14 rounded-full transition-all duration-200 bg-primary text-white shadow-md
//                           hover:bg-[#1a73e8]/90`}
//             >
//               <User className="h-6 w-6" />
//             </button>
//           </Link>
//         </div>

//         {/* Logout button on the right side (fixed right inside container) */}
//         <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
//           <button
//             onClick={onLogoutClick}
//             className="inline-flex items-center justify-center w-12 h-12 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
//           >
//             <LogOut className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BottomNav;
